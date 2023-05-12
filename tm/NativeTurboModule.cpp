#include "NativeTurboModule.h"

#include <ReactCommon/TurboModuleUtils.h>
#include "RustPromiseManager.h"
#include "dist/lib.rs.h"

namespace facebook::react {

NativeTurboModule::NativeTurboModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeTurboModuleCxxSpec(std::move(jsInvoker)) {}

jsi::Value NativeTurboModule::add(jsi::Runtime& rt, double a, double b) {
  return createPromiseAsJSIValue(
    rt,
    [=](jsi::Runtime &innerRt, std::shared_ptr<Promise> promise) {
      promise->resolve(a + b);
      std::string error;
      try {
        auto currentID = RustPromiseManager::instance.addPromise(
          promise,
          this->jsInvoker_,
          innerRt
        );
        rustAdd(
          a,
          b,
          currentID
        );
      } catch (const std::exception &e) {
        error = e.what();
      }
    }
  );
}

} // namespace facebook::react
