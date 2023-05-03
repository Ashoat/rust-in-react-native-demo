#pragma once

#if __has_include(<React-Codegen/AppSpecsJSI.h>) // CocoaPod headers on Apple
#include <React-Codegen/AppSpecsJSI.h>
#elif __has_include("AppSpecsJSI.h") // CMake headers on Android
#include "AppSpecsJSI.h"
#endif
#include <memory>

namespace facebook::react {

class NativeTurboModule : public NativeTurboModuleCxxSpec<NativeTurboModule> {
 public:
  NativeTurboModule(std::shared_ptr<CallInvoker> jsInvoker);

  jsi::Value add(jsi::Runtime &rt, double a, double b);
};

} // namespace facebook::react
