let onWorkerMessage = e => {
  console.log("receive message from SW.Message was " + e);
  // alert("reload!!")
  location.reload();
};
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js", { scope: "./" })
    .then(function(registration) {
      console.log("Service Worker Registered");
			// このSW登録イベントハンドラ内でSWにメッセージしてキャッシュを消させてからリロードさせてる			
			const channel = new MessageChannel();
			registration.onupdatefound = function() {
				console.log('[UI Thread]SWスクリプトアップデート検出!！（onupdatefoundイベント）');
				if (typeof registration.update == 'function') {
					registration.update();
					navigator.serviceWorker.controller.postMessage('updateDESU!', [channel.port1]);
					setTimeout(location.reload(),1000);
				}
			}
    });

  navigator.serviceWorker.ready.then(function(registration) {
    console.log("Service Worker Ready");
  });
  navigator.serviceWorker.addEventListener("message", onWorkerMessage);
}


// offline-plugin runtimeによるSWイベントの受信
const runtime = require('offline-plugin/runtime');

runtime.install({
  onUpdating: () => {
    console.log('SW Event detected in UI Thread:onUpdating', 'onUpdating');
  },
  onUpdateReady: () => {
    console.log('SW Event detected in UI Thread:onUpdateReady', 'onUpdateReady');
    // Tells to new SW to take control immediately
    runtime.applyUpdate();
  },
  onUpdated: () => {
    console.log('SW Event detected in UI Thread:onUpdated', 'onUpdated');
    // 新SWのアップデートイベントでページをリロードさせる
    window.location.reload();         
  },

  onUpdateFailed: () => {
    console.log('SW Event detected in UI Thread:onUpdateFailed', 'onUpdateFailed');
  }
});