export default function documentReady() {
  return new Promise(resolve => {
    const isComplete = document.readyState === 'complete';
    if (isComplete) {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', resolve);
    }
  });
}
