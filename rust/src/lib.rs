use ffi::string_callback;
use lazy_static::lazy_static;
use std::sync::Arc;
use tokio::runtime::{Builder, Runtime};

lazy_static! {
    pub static ref RUNTIME: Arc<Runtime> = Arc::new(
        Builder::new_multi_thread()
            .worker_threads(1)
            .max_blocking_threads(1)
            .enable_all()
            .build()
            .unwrap()
    );
}

#[cxx::bridge]
mod ffi {
    extern "Rust" {
        #[cxx_name = "rustAdd"]
        fn add(a: u32, b: u32, promise_id: u32);
    }
    unsafe extern "C++" {
        include!("RustCallback.h");
        #[cxx_name = "stringCallback"]
        fn string_callback(error: String, promise_id: u32, ret: String);
    }
}

fn add(a: u32, b: u32, promise_id: u32) {
    RUNTIME.spawn(async move {
        let result = add_helper(a, b).await;
        string_callback("".to_string(), promise_id, result);
    });
}

async fn add_helper(a: u32, b: u32) -> String {
    (a + b).to_string()
}
