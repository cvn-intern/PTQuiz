<style>
    .thunder {
      left: 0;
      top:50%;
      width: 150px;
      height: 50vh;
      position: relative;
      transform: translateY(-50%);
    }
    .thunder:before,
    .thunder:after {
      content: "";
      position: absolute;
      inset: 0;
      background: #ff8001;
      box-shadow: 0 0 0 50px;
      clip-path: polygon(
        100% 0,
        23% 46%,
        46% 44%,
        15% 69%,
        38% 67%,
        0 100%,
        76% 57%,
        53% 58%,
        88% 33%,
        60% 37%
      );
    }

    .thunder:after {
      animation: pulsing 1s infinite;
      transform: perspective(300px) translateZ(0px);
    }

    @keyframes pulsing {
      to {
        transform: perspective(300px) translateZ(180px);
        opacity: 0;
      }
    }
    @media (max-width: 768px) {
      .thunder {
        width: 80px;
        height: 20vh;
      }
    }
  </style>

<div class="thunder"></div>
