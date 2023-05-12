#!/usr/bin/env bash

set -euxo pipefail

PRJ_ROOT="$(git rev-parse --show-toplevel)"

# The $PATH used by Xcode likely won't contain Cargo, fix that.
# In addition, the $PATH used by XCode has lots of Apple-specific
# developer tools that your Cargo isn't expecting to use, fix that.
# Note: This assumes a default `rustup` setup and default path.
build_path="$HOME/.cargo/bin:/usr/local/bin:/usr/bin:/bin${PATH:+:}$PATH"

# cd to Cargo project
cd "${SRCROOT}/../../rust" || exit

# Set C++ standard and build cxx bridge
export CXXFLAGS="-std=c++14"
env PATH="${build_path}" cargo build --release

# Build universal static library (works on simulator and iOS)
env PATH="${build_path}" cargo lipo --release

# Unset the flag specifying C++ standard
unset CXXFLAGS

# Copy the CXX files to the cargo project root to make them
# available to XCode
mkdir -p ../tm/dist
cp "$(readlink target/cxxbridge/rust/src/lib.rs.cc)" ../tm/dist/
cp "$(readlink target/cxxbridge/rust/src/lib.rs.h)" ../tm/dist/
cp "$(readlink target/cxxbridge/rust/cxx.h)" ../tm/dist/
