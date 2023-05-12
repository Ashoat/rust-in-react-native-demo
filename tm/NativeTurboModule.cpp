#include "NativeTurboModule.h"
#include "RustPromiseManager.h"
#include <ReactCommon/TurboModuleUtils.h>
#include "../rust/lib.rs.h"

namespace facebook::react
{

  NativeTurboModule::NativeTurboModule(std::shared_ptr<CallInvoker> jsInvoker)
      : NativeTurboModuleCxxSpec(std::move(jsInvoker)) {}

  jsi::Value NativeTurboModule::add(jsi::Runtime &rt, double a, double b)
  {
    return createPromiseAsJSIValue(
        rt,
        [this, a, b](jsi::Runtime &innerRt, std::shared_ptr<Promise> promise)
        {
          std::string error;
          try
          {
            auto currentID = RustPromiseManager::instance.addPromise(
                promise, this->jsInvoker_, innerRt);
            rustAdd(
                a,
                b,
                currentID);
          }
          catch (const std::exception &e)
          {
            error = e.what();
          };
        });
  }

} // namespace facebook::react
