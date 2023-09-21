const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // prevent the default browser install prompt
    event.preventDefault();
    // Store the event for later use
    deferredPrompt = event;
    // Show custom install button
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Trigger the deferred prompt
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the installation');
          } else {
            console.log('User dismissed the installation');
          }
          deferredPrompt = null;
          // Hide the custom install button after installation
          butInstall.style.display = 'none';
        });
      }
    });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed', event);
});
