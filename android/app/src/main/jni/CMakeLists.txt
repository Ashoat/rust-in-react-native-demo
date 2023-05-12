# Copyright (c) Meta Platforms, Inc. and affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# This CMake file is the default used by apps and is placed inside react-native
# to encapsulate it from user space (so you won't need to touch C++/Cmake code at all on Android).
#
# If you wish to customize it (because you want to manually link a C++ library or pass a custom
# compilation flag) you can:
#
# 1. Copy this CMake file inside the `android/app/src/main/jni` folder of your project
# 2. Copy the OnLoad.cpp (in this same folder) file inside the same folder as above.
# 3. Extend your `android/app/build.gradle` as follows
#
# android {
#    // Other config here...
#    externalNativeBuild {
#        cmake {
#            path "src/main/jni/CMakeLists.txt"
#        }
#    }
# }

cmake_minimum_required(VERSION 3.18)

# Define the library name here.
project(appmodules)

include(FetchContent)

FetchContent_Declare(
  Corrosion
  GIT_REPOSITORY https://github.com/corrosion-rs/corrosion.git
  GIT_TAG v0.2.1
)

FetchContent_MakeAvailable(Corrosion)

include(corrosion_cxx.cmake)

# This file includes all the necessary to let you build your application with the New Architecture.
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

if(CMAKE_ANDROID_ARCH_ABI STREQUAL arm64-v8a)
  set(Rust_CARGO_TARGET aarch64-linux-android)
elseif(CMAKE_ANDROID_ARCH_ABI STREQUAL x86)
  set(Rust_CARGO_TARGET i686-linux-android)
elseif(CMAKE_ANDROID_ARCH_ABI STREQUAL x86_64)
  set(Rust_CARGO_TARGET x86_64-linux-android)
elseif(CMAKE_ANDROID_ARCH_ABI STREQUAL armeabi-v7a)
  set(Rust_CARGO_TARGET armv7-linux-androideabi)
endif()

string(TOLOWER ${CMAKE_HOST_SYSTEM_NAME} CMAKE_HOST_SYSTEM_NAME_LOWER)
set(_toolchain_path
  "$ENV{ANDROID_HOME}/ndk/${NDK_VERSION}/toolchains/llvm/prebuilt/${CMAKE_HOST_SYSTEM_NAME_LOWER}-x86_64/bin"
)
if(EXISTS "${_toolchain_path}/${Rust_CARGO_TARGET}-ar")
  set(AR "${_toolchain_path}/${Rust_CARGO_TARGET}-ar")
else()
  set(AR "${_toolchain_path}/llvm-ar")
endif()


add_library_rust(PATH ../../../../../rust NAMESPACE demo)

# App needs to add and link against tm (TurboModules) folder
add_subdirectory(${REACT_ANDROID_DIR}/../../../tm/ tm_build)
target_link_libraries(${CMAKE_PROJECT_NAME} tm demo::rust)
