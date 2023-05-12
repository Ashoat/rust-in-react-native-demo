require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name            = "AppTurboModules"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "12.4" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }
  s.source_files    = "**/*.{h,cpp}", "../rust/**/*.{h,cpp,cc}"
  s.public_header_files = "../rust/**/*.h"
  s.vendored_libraries = '../rust/target/universal/release/librust.a'
  s.pod_target_xcconfig = {
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }
  s.script_phases = [
    {
      :name => 'Build Rust library',
      :script => '${PODS_TARGET_SRCROOT}/build-rust-native-library.sh',
      :execution_position => :before_compile
    }
  ]
  install_modules_dependencies(s)
end
