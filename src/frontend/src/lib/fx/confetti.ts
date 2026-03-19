export function triggerConfetti() {
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const _particleCount = 50 * (timeLeft / duration);

    const confettiElement = document.createElement("div");
    confettiElement.style.position = "fixed";
    confettiElement.style.width = "10px";
    confettiElement.style.height = "10px";
    confettiElement.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confettiElement.style.left = `${randomInRange(0, 100)}%`;
    confettiElement.style.top = "-10px";
    confettiElement.style.zIndex = String(defaults.zIndex);
    confettiElement.style.pointerEvents = "none";
    confettiElement.style.borderRadius = "50%";

    document.body.appendChild(confettiElement);

    const animation = confettiElement.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translateY(${window.innerHeight + 20}px) rotate(${randomInRange(-180, 180)}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: randomInRange(2000, 4000),
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    );

    animation.onfinish = () => {
      confettiElement.remove();
    };
  }, 250);
}
