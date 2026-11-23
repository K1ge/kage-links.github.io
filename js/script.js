/* ============================================================
   Загрузочный экран
   ============================================================ */
(function () {
    'use strict';

    var preloader = document.getElementById('preloader');
    var fill      = document.getElementById('preloaderFill');
    var percentEl = document.getElementById('preloaderPercent');
    var textEl    = document.getElementById('preloaderText');

    if (!preloader || !fill || !percentEl || !textEl) return;

    var stages = [
        { until: 45,  text: 'Загрузка ресурсов…' },
        { until: 80,  text: 'Сборка интерфейса…' },
        { until: 100, text: 'Готово' }
    ];

    var progress = 0;
    var finished = false;

    function updateStageText(value) {
        for (var i = 0; i < stages.length; i++) {
            if (value <= stages[i].until) {
                textEl.textContent = stages[i].text;
                return;
            }
        }
        textEl.textContent = stages[stages.length - 1].text;
    }

    function finish() {
        if (finished) return;
        finished = true;
        preloader.classList.add('preloader--done');
        document.body.classList.add('is-loaded');
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 900);
    }

    function tick() {
        progress += Math.random() * 12 + 6;
        if (progress > 100) progress = 100;

        var rounded = Math.floor(progress);
        fill.style.width = progress + '%';
        percentEl.textContent = rounded + '%';
        updateStageText(rounded);

        if (progress < 100) {
            setTimeout(tick, 70 + Math.random() * 70);
        } else {
            setTimeout(finish, 260);
        }
    }

    function start() {
        setTimeout(tick, 150);
    }

    if (document.readyState === 'complete') {
        start();
    } else {
        window.addEventListener('load', start);
    }

    setTimeout(finish, 4000);
})();