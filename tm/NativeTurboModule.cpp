#include "NativeTurboModule.h"

#include <ReactCommon/TurboModuleUtils.h>

namespace facebook::react {

NativeTurboModule::NativeTurboModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeTurboModuleCxxSpec(std::move(jsInvoker)) {}

jsi::Value NativeTurboModule::add(jsi::Runtime& rt, double a, double b) {
  return createPromiseAsJSIValue(
    rt,
    [=](jsi::Runtime &innerRt, std::shared_ptr<Promise> promise) {
      promise->resolve(a + b);
    }
  );
}

} // namespace facebook::react
