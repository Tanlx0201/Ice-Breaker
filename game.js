// game.js - Ice Breaker Casino Game Engine
// Controls Roulette Wheel, 3D Cards, Slot Machine 777, and Animations

document.addEventListener('DOMContentLoaded', () => {
    // Instantiate Modules
    const qManager = new QuestionManager();
    const audio = new CasinoAudio();

    // Game State
    let currentMode = 'wheel'; // 'wheel', 'cards', 'slots'
    let currentLang = localStorage.getItem('icebreaker_lang') || 'vi';
    let isSpinning = false;
    let currentQuestionData = null;

    // DOM Elements
    const langBtn = document.getElementById('langToggleBtn');
    const audioBtn = document.getElementById('audioToggleBtn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const modeViews = document.querySelectorAll('.mode-view');

    // Modals & Toasts
    const jackpotModal = document.getElementById('jackpotModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTopicBadge = document.getElementById('modalTopicBadge');
    const modalQuestionText = document.getElementById('modalQuestionText');
    const modalSecondaryText = document.getElementById('modalSecondaryText');
    const copyQuestionBtn = document.getElementById('copyQuestionBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    
    // Custom Question Modal
    const customModal = document.getElementById('customModal');
    const openCustomModalBtn = document.getElementById('openCustomModalBtn');
    const closeCustomModalBtn = document.getElementById('closeCustomModalBtn');
    const customQuestionForm = document.getElementById('customQuestionForm');
    const customTopicSelect = document.getElementById('customTopicSelect');
    const customQuestionInput = document.getElementById('customQuestionInput');
    const customListEl = document.getElementById('customQuestionsList');

    const toastEl = document.getElementById('casinoToast');
    const toastTextEl = document.getElementById('toastText');

    // UI Translation Strings
    const I18N = {
        vi: {
            brandSubtitle: "Phiên bản Casino VIP",
            tabWheel: "Vòng Quay Roulette",
            tabCards: "Lật Bài Ma Thuật",
            tabSlots: "Máy Kéo Slots 777",
            spinWheelBtn: "QUAY VÒNG ROULETTE",
            spinWheelHub: "QUAY",
            dealCardsBtn: "TRÁO VÀ CHIA LẠI BÀI",
            tableInstruction: "Chọn một lá bài định mệnh từ sòng bạc hoàng gia:",
            spinSlotsBtn: "GIẬT CẦN SLOTS",
            copyBtn: "Sao chép câu hỏi",
            nextBtn: "Đổi câu khác",
            toastCopied: "Đã sao chép câu hỏi vào clipboard!",
            customTitle: "Thêm câu hỏi của riêng bạn",
            addBtn: "Thêm câu hỏi",
            rarityCommon: "Phổ thông",
            rarityRare: "Hiếm",
            rarityEpic: "Cực hiếm",
            rarityLegendary: "Huyền thoại"
        },
        en: {
            brandSubtitle: "High-Roller VIP Edition",
            tabWheel: "Roulette Wheel",
            tabCards: "Mystery Card Flip",
            tabSlots: "Vegas 777 Slots",
            spinWheelBtn: "SPIN ROULETTE",
            spinWheelHub: "SPIN",
            dealCardsBtn: "SHUFFLE & DEAL HAND",
            tableInstruction: "Choose your fate from the luxury poker deck:",
            spinSlotsBtn: "PULL SLOTS LEVER",
            copyBtn: "Copy Question",
            nextBtn: "Next Question",
            toastCopied: "Question copied to clipboard!",
            customTitle: "Add Your Custom Questions",
            addBtn: "Add Question",
            rarityCommon: "Common",
            rarityRare: "Rare",
            rarityEpic: "Epic",
            rarityLegendary: "Legendary"
        }
    };

    function showToast(msg) {
        toastTextEl.textContent = msg;
        toastEl.classList.add('active');
        setTimeout(() => toastEl.classList.remove('active'), 2800);
    }

    // ==========================================================================
    // LANGUAGE & SOUND TOGGLES
    // ==========================================================================
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('icebreaker_lang', lang);
        langBtn.textContent = lang === 'vi' ? '🇻🇳 VN' : '🇬🇧 EN';

        // Update texts
        const dict = I18N[lang];
        document.getElementById('brandSubtitle').textContent = dict.brandSubtitle;
        document.getElementById('tabWheelText').textContent = dict.tabWheel;
        document.getElementById('tabCardsText').textContent = dict.tabCards;
        document.getElementById('tabSlotsText').textContent = dict.tabSlots;
        document.getElementById('spinWheelBtnText').textContent = dict.spinWheelBtn;
        document.getElementById('wheelCenterText').textContent = dict.spinWheelHub;
        document.getElementById('dealCardsBtnText').textContent = dict.dealCardsBtn;
        document.getElementById('tableInstructionText').textContent = dict.tableInstruction;
        document.getElementById('spinSlotsBtnText').textContent = dict.spinSlotsBtn;
        document.getElementById('copyBtnText').textContent = dict.copyBtn;
        document.getElementById('nextBtnText').textContent = dict.nextBtn;

        // Re-render wheel labels
        drawWheel();

        // If modal open, refresh current text
        if (currentQuestionData && jackpotModal.classList.contains('active')) {
            updateModalDisplay(currentQuestionData);
        }
    }

    langBtn.addEventListener('click', () => {
        audio.playButtonClick();
        applyLanguage(currentLang === 'vi' ? 'en' : 'vi');
    });

    function updateAudioButton() {
        if (audio.muted) {
            audioBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
            audioBtn.classList.add('muted');
        } else {
            audioBtn.innerHTML = '<i class="fas fa-volume-high"></i>';
            audioBtn.classList.remove('muted');
        }
    }

    audioBtn.addEventListener('click', () => {
        audio.toggleMute();
        updateAudioButton();
    });

    // Navigation Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            if (mode === currentMode || isSpinning) return;
            audio.playButtonClick();
            currentMode = mode;

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            modeViews.forEach(v => {
                v.classList.remove('active');
                if (v.id === `${mode}View`) v.classList.add('active');
            });

            if (mode === 'cards') dealCardHand();
            if (mode === 'wheel') {
                const currentSize = getWheelLayoutSize();
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                if (canvas.width !== Math.round(currentSize * dpr) || canvas.height !== Math.round(currentSize * dpr)) {
                    resizeCanvas();
                }
            }
        });
    });

    // ==========================================================================
    // MODE 1: LUCKY ROULETTE WHEEL LOGIC (Canvas & Physics)
    // ==========================================================================
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const wheelPointer = document.getElementById('wheelPointer');
    const spinWheelBtn = document.getElementById('spinWheelBtn');
    const wheelCenterHub = document.getElementById('wheelCenterHub');

    let sectors = [];
    let currentDeg = 0;
    let lastSectorIndex = -1;
    let lastTickTime = 0;
    let lastKnownWheelSize = 352;

    function getWheelLayoutSize() {
        // clientWidth / clientHeight give the layout box (UNTRANSFORMED by CSS rotate)
        // getBoundingClientRect() returns the rotated axis-aligned bounding box which expands dynamically!
        let w = canvas.clientWidth;
        let h = canvas.clientHeight;

        if (!w || !h) {
            const frame = canvas.parentElement;
            if (frame && frame.clientWidth) {
                w = frame.clientWidth - 28;
                h = frame.clientHeight - 28;
            }
        }

        if (!w || w <= 0) w = lastKnownWheelSize || 352;
        if (!h || h <= 0) h = lastKnownWheelSize || 352;

        const size = Math.round(Math.min(w, h));
        if (canvas.offsetParent !== null && size > 0) {
            lastKnownWheelSize = size;
        }
        return size;
    }

    function initWheelSectors() {
        const baseTopics = qManager.getAllTopics();
        sectors = baseTopics.map(topic => {
            const meta = TOPIC_METADATA[topic] || { color: '#6366F1', tagVi: topic, tagEn: topic };
            return {
                topic: topic,
                color: meta.color,
                labelVi: meta.tagVi,
                labelEn: meta.tagEn,
                icon: meta.icon
            };
        });
    }

    function resizeCanvas() {
        if (!canvas) return;
        // If wheel tab is currently hidden (display: none), skip resize until tab is activated
        if (canvas.offsetParent === null && lastKnownWheelSize > 0) return;

        const size = getWheelLayoutSize();
        if (size <= 0) return;

        // Cap DPR to 2 to save GPU texture memory on mobile screens with 3x DPR
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const targetPixelSize = Math.round(size * dpr);

        if (canvas.width !== targetPixelSize || canvas.height !== targetPixelSize) {
            canvas.width = targetPixelSize;
            canvas.height = targetPixelSize;
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        drawWheel();
    }

    function drawWheel() {
        if (!canvas || sectors.length === 0) return;
        const size = getWheelLayoutSize();
        const width = size;
        const height = size;
        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2 - 8;
        const arc = (2 * Math.PI) / sectors.length;

        ctx.clearRect(0, 0, width, height);

        sectors.forEach((sec, i) => {
            const angle = i * arc;

            // Draw Sector Arc
            ctx.beginPath();
            ctx.fillStyle = sec.color;
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + arc);
            ctx.lineTo(centerX, centerY);
            ctx.fill();

            // Inner Shadow Overlay
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + arc);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
            ctx.fill();
            ctx.restore();

            // Sector Separator (Gold metallic line)
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();

            // Text / Label Rendering
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle + arc / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 13px "Outfit", sans-serif';
            ctx.shadowColor = 'rgba(0,0,0,0.6)';
            ctx.shadowBlur = 2;

            const label = currentLang === 'vi' ? sec.labelVi : sec.labelEn;
            ctx.fillText(label, radius - 24, 5);
            ctx.restore();

            // Golden Pegs around perimeter
            const pegX = centerX + (radius - 2) * Math.cos(angle);
            const pegY = centerY + (radius - 2) * Math.sin(angle);
            ctx.beginPath();
            ctx.arc(pegX, pegY, 3, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffd700';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }

    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;
        spinWheelBtn.disabled = true;

        // Smooth physics calculation: 5 to 8 full rotations + randomized target slice
        const fullSpins = 5 + Math.floor(Math.random() * 3);
        const extraDeg = Math.floor(Math.random() * 360);
        const targetDeg = currentDeg + fullSpins * 360 + extraDeg;

        const startTime = performance.now();
        const duration = 4000; // 4 seconds total
        const startDeg = currentDeg;
        const totalDistance = targetDeg - startDeg;

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const easeProgress = easeOutCubic(progress);

            currentDeg = startDeg + totalDistance * easeProgress;
            // Hardware-accelerated GPU transform rotation (ZERO canvas redraws during spin!)
            canvas.style.transform = `rotate(${currentDeg}deg)`;

            // Pointer position is at Top (270 degrees)
            const normalizedDeg = ((currentDeg % 360) + 360) % 360;
            const pointerAngleDeg = (270 - normalizedDeg + 360) % 360;
            const arcDeg = 360 / sectors.length;
            const currentSectorIdx = Math.floor(pointerAngleDeg / arcDeg);

            if (currentSectorIdx !== lastSectorIndex) {
                lastSectorIndex = currentSectorIdx;
                if (now - lastTickTime > 45) { // Throttle tick audio on mobile
                    audio.playTick();
                    lastTickTime = now;
                }
                wheelPointer.classList.add('tick');
                setTimeout(() => wheelPointer.classList.remove('tick'), 40);
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                isSpinning = false;
                spinWheelBtn.disabled = false;
                audio.playJackpot();
                triggerConfetti();

                const winnerSector = sectors[currentSectorIdx];
                setTimeout(() => {
                    revealQuestion(winnerSector.topic);
                }, 350);
            }
        }

        requestAnimationFrame(step);
    }

    spinWheelBtn.addEventListener('click', spinWheel);
    wheelCenterHub.addEventListener('click', spinWheel);

    // ==========================================================================
    // MODE 2: 3D CARD FLIP TABLE LOGIC
    // ==========================================================================
    const cardsContainer = document.getElementById('cardsContainer');
    const dealCardsBtn = document.getElementById('dealCardsBtn');

    function dealCardHand() {
        cardsContainer.innerHTML = '';
        audio.playCardFlip();

        const availableTopics = qManager.getAllTopics();
        const cardCount = window.innerWidth < 640 ? 4 : 5;
        const rarities = [
            { name: I18N[currentLang].rarityCommon, stars: '★☆☆☆☆' },
            { name: I18N[currentLang].rarityRare, stars: '★★☆☆☆' },
            { name: I18N[currentLang].rarityEpic, stars: '★★★☆☆' },
            { name: I18N[currentLang].rarityLegendary, stars: '★★★★☆' }
        ];

        for (let i = 0; i < cardCount; i++) {
            const randomTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
            const qData = qManager.getRandomQuestion(randomTopic, currentLang);
            const meta = TOPIC_METADATA[randomTopic] || { color: '#6366F1', tagVi: randomTopic, tagEn: randomTopic };
            const rarity = rarities[Math.floor(Math.random() * rarities.length)];

            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'card-wrapper';
            cardWrapper.innerHTML = `
                <div class="card-face card-back">
                    <div class="card-back-pattern"></div>
                    <div class="card-back-symbol">
                        <i class="fas fa-crown"></i>
                        <span>ROYAL VIP</span>
                    </div>
                </div>
                <div class="card-face card-front" style="border-color: ${meta.color};">
                    <div class="card-front-header">
                        <span class="card-topic-tag" style="background: ${meta.color};">
                            ${currentLang === 'vi' ? meta.tagVi : meta.tagEn}
                        </span>
                        <span class="card-stars">${rarity.stars}</span>
                    </div>
                    <div class="card-front-body">
                        <p class="card-question-preview">${qData.text}</p>
                    </div>
                    <div class="card-front-footer">
                        <span class="card-view-btn">
                            <i class="fas fa-eye"></i> MỞ RỘNG
                        </span>
                    </div>
                </div>
            `;

            cardWrapper.addEventListener('click', () => {
                if (!cardWrapper.classList.contains('flipped')) {
                    audio.playCardFlip();
                    cardWrapper.classList.add('flipped');
                    triggerConfetti();

                    setTimeout(() => {
                        currentQuestionData = qData;
                        openModal(qData);
                    }, 500);
                } else {
                    currentQuestionData = qData;
                    openModal(qData);
                }
            });

            cardsContainer.appendChild(cardWrapper);
        }
    }

    dealCardsBtn.addEventListener('click', () => {
        dealCardHand();
    });

    // ==========================================================================
    // MODE 3: VEGAS 777 SLOTS LOGIC
    // ==========================================================================
    const spinSlotsBtn = document.getElementById('spinSlotsBtn');
    const slotLever = document.getElementById('slotLever');
    const reel1Strip = document.getElementById('reel1Strip');
    const reel2Strip = document.getElementById('reel2Strip');
    const reel3Strip = document.getElementById('reel3Strip');

    const REEL1_ITEMS = [
        { topic: "Life", icon: "fa-heart-pulse", labelVi: "Cuộc sống", labelEn: "Life", color: "#8B5CF6" },
        { topic: "Random", icon: "fa-dice", labelVi: "Hài hước", labelEn: "Random", color: "#3B82F6" },
        { topic: "Deep", icon: "fa-brain", labelVi: "Chiều sâu", labelEn: "Deep", color: "#10B981" },
        { topic: "Experiences", icon: "fa-compass", labelVi: "Trải nghiệm", labelEn: "Experience", color: "#F59E0B" },
        { topic: "If you could...", icon: "fa-wand-magic-sparkles", labelVi: "Nếu có thể...", labelEn: "If could...", color: "#EC4899" },
        { topic: "Would you rather...", icon: "fa-scale-balanced", labelVi: "Thà chọn...", labelEn: "Rather...", color: "#6366F1" }
    ];

    const REEL2_ITEMS = [
        { mod: "Detail", icon: "fa-book-open", labelVi: "Kể thật chi tiết", labelEn: "In full detail" },
        { mod: "Fast", icon: "fa-bolt", labelVi: "Trả lời trong 5s", labelEn: "Answer in 5s" },
        { mod: "Funny", icon: "fa-face-laugh-squint", labelVi: "Kèm biểu cảm hài", labelEn: "Make it funny" },
        { mod: "Truth", icon: "fa-eye", labelVi: "Khai thật 100%", labelEn: "100% Truth" },
        { mod: "Jackpot", icon: "fa-crown", labelVi: "👑 JACKPOT 777", labelEn: "JACKPOT" }
    ];

    const REEL3_ITEMS = [
        { target: "You", icon: "fa-user", labelVi: "Chính bạn", labelEn: "You" },
        { target: "Left", icon: "fa-arrow-left", labelVi: "Người bên trái", labelEn: "Person on Left" },
        { target: "Right", icon: "fa-arrow-right", labelVi: "Người bên phải", labelEn: "Person on Right" },
        { target: "Group", icon: "fa-users", labelVi: "Cả bàn trả lời", labelEn: "Everyone" }
    ];

    function populateReel(stripEl, items) {
        stripEl.innerHTML = '';
        const repeated = [...items, ...items, ...items, ...items, ...items, ...items];
        repeated.forEach(item => {
            const div = document.createElement('div');
            div.className = 'reel-item';
            div.innerHTML = `
                <i class="fas ${item.icon}" style="color: ${item.color || '#ffd700'}"></i>
                <span class="reel-item-label">${currentLang === 'vi' ? item.labelVi : item.labelEn}</span>
            `;
            stripEl.appendChild(div);
        });
    }

    populateReel(reel1Strip, REEL1_ITEMS);
    populateReel(reel2Strip, REEL2_ITEMS);
    populateReel(reel3Strip, REEL3_ITEMS);

    function spinSlots() {
        if (isSpinning) return;
        isSpinning = true;
        spinSlotsBtn.disabled = true;

        slotLever.classList.add('pulled');
        setTimeout(() => slotLever.classList.remove('pulled'), 400);

        audio.playTick(1200);

        const r1Target = Math.floor(Math.random() * REEL1_ITEMS.length);
        const r2Target = Math.floor(Math.random() * REEL2_ITEMS.length);
        const r3Target = Math.floor(Math.random() * REEL3_ITEMS.length);

        const itemHeight = 160;
        const r1Offset = (REEL1_ITEMS.length * 3 + r1Target) * itemHeight;
        const r2Offset = (REEL2_ITEMS.length * 3 + r2Target) * itemHeight;
        const r3Offset = (REEL3_ITEMS.length * 3 + r3Target) * itemHeight;

        reel1Strip.style.transition = 'transform 2s cubic-bezier(0.15, 0.9, 0.2, 1)';
        reel2Strip.style.transition = 'transform 2.6s cubic-bezier(0.15, 0.9, 0.2, 1)';
        reel3Strip.style.transition = 'transform 3.2s cubic-bezier(0.15, 0.9, 0.2, 1)';

        reel1Strip.style.transform = `translateY(-${r1Offset}px)`;
        reel2Strip.style.transform = `translateY(-${r2Offset}px)`;
        reel3Strip.style.transform = `translateY(-${r3Offset}px)`;

        setTimeout(() => audio.playReelStop(), 2000);
        setTimeout(() => audio.playReelStop(), 2600);
        setTimeout(() => {
            audio.playReelStop();
            audio.playJackpot();
            triggerConfetti();

            const winR1 = REEL1_ITEMS[r1Target];
            const winR2 = REEL2_ITEMS[r2Target];
            const winR3 = REEL3_ITEMS[r3Target];

            isSpinning = false;
            spinSlotsBtn.disabled = false;

            const qData = qManager.getRandomQuestion(winR1.topic, currentLang);
            qData.slotModifier = currentLang === 'vi' ? winR2.labelVi : winR2.labelEn;
            qData.slotTarget = currentLang === 'vi' ? winR3.labelVi : winR3.labelEn;
            
            setTimeout(() => {
                revealQuestion(winR1.topic, qData);
            }, 400);
        }, 3200);
    }

    spinSlotsBtn.addEventListener('click', spinSlots);
    slotLever.addEventListener('click', spinSlots);

    // ==========================================================================
    // QUESTION MODAL LOGIC
    // ==========================================================================
    function revealQuestion(topic, customQ = null) {
        const qData = customQ || qManager.getRandomQuestion(topic, currentLang);
        currentQuestionData = qData;
        openModal(qData);
    }

    function openModal(qData) {
        updateModalDisplay(qData);
        jackpotModal.classList.add('active');
        audio.playWin();
    }

    function updateModalDisplay(qData) {
        const meta = TOPIC_METADATA[qData.topic] || { tagVi: qData.topic, tagEn: qData.topic, color: '#ffd700' };
        let badgeText = `<i class="fas ${meta.icon || 'fa-star'}"></i> ${currentLang === 'vi' ? meta.tagVi : meta.tagEn}`;
        
        if (qData.slotModifier) {
            badgeText += ` | ✨ ${qData.slotModifier} | 🎯 ${qData.slotTarget}`;
        }
        modalTopicBadge.innerHTML = badgeText;
        modalTopicBadge.style.borderColor = meta.color;
        modalTopicBadge.style.color = meta.color;

        const mainText = currentLang === 'vi' ? qData.textVi : qData.textEn;
        const secText = currentLang === 'vi' ? qData.textEn : qData.textVi;

        modalQuestionText.textContent = mainText || qData.text;
        modalSecondaryText.textContent = secText ? `"${secText}"` : '';
    }

    function closeModal() {
        jackpotModal.classList.remove('active');
    }

    modalCloseBtn.addEventListener('click', closeModal);
    jackpotModal.addEventListener('click', (e) => {
        if (e.target === jackpotModal) closeModal();
    });

    nextQuestionBtn.addEventListener('click', () => {
        if (!currentQuestionData) return;
        audio.playCardFlip();
        const nextQ = qManager.getRandomQuestion(currentQuestionData.topic, currentLang);
        currentQuestionData = nextQ;
        updateModalDisplay(nextQ);
    });

    copyQuestionBtn.addEventListener('click', () => {
        if (!currentQuestionData) return;
        const textToCopy = currentLang === 'vi' ? currentQuestionData.textVi : currentQuestionData.textEn;
        navigator.clipboard.writeText(textToCopy || currentQuestionData.text).then(() => {
            showToast(I18N[currentLang].toastCopied);
            audio.playButtonClick();
        });
    });

    // ==========================================================================
    // CUSTOM QUESTION MANAGER
    // ==========================================================================
    function renderCustomQuestions() {
        const list = qManager.getCustomQuestions();
        customListEl.innerHTML = '';
        if (list.length === 0) {
            customListEl.innerHTML = '<p style="color: #64748b; font-size: 0.85rem;">Chưa có câu hỏi tự tạo nào.</p>';
            return;
        }

        list.forEach(item => {
            const div = document.createElement('div');
            div.className = 'custom-item';
            div.innerHTML = `
                <div>
                    <strong style="color: #f59e0b;">[${item.topic}]</strong> ${item.text}
                </div>
                <button class="btn-delete-custom" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            div.querySelector('.btn-delete-custom').addEventListener('click', () => {
                qManager.deleteCustomQuestion(item.id);
                renderCustomQuestions();
                showToast("Đã xóa câu hỏi tùy chỉnh!");
            });
            customListEl.appendChild(div);
        });
    }

    openCustomModalBtn.addEventListener('click', () => {
        audio.playButtonClick();
        renderCustomQuestions();
        customModal.classList.add('active');
    });

    closeCustomModalBtn.addEventListener('click', () => {
        customModal.classList.remove('active');
    });

    customModal.addEventListener('click', (e) => {
        if (e.target === customModal) customModal.classList.remove('active');
    });

    customQuestionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const topic = customTopicSelect.value;
        const text = customQuestionInput.value.trim();
        if (!text) return;

        qManager.addCustomQuestion(topic, text);
        customQuestionInput.value = '';
        renderCustomQuestions();
        showToast("Đã thêm câu hỏi thành công!");
        audio.playWin();
    });

    // ==========================================================================
    // CASINO CONFETTI & PARTICLES ENGINE
    // ==========================================================================
    const particlesCanvas = document.getElementById('particlesCanvas');
    const pCtx = particlesCanvas.getContext('2d');
    let particles = [];

    function resizeParticles() {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }

    let particlesRunning = false;

    function triggerConfetti() {
        const colors = ['#ffd700', '#f59e0b', '#ec4899', '#06b6d4', '#10b981', '#fff'];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() - 0.7) * 14,
                size: Math.random() * 5 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 8,
                alpha: 1,
                decay: Math.random() * 0.015 + 0.012
            });
        }
        if (!particlesRunning) {
            particlesRunning = true;
            requestAnimationFrame(animateParticles);
        }
    }

    function animateParticles() {
        pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

        particles = particles.filter(p => p.alpha > 0.01);
        if (particles.length === 0) {
            particlesRunning = false;
            return; // STOP animation loop when idle!
        }

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.25;
            p.rotation += p.rSpeed;
            p.alpha -= p.decay;

            pCtx.save();
            pCtx.translate(p.x, p.y);
            pCtx.rotate((p.rotation * Math.PI) / 180);
            pCtx.globalAlpha = Math.max(0, p.alpha);
            pCtx.fillStyle = p.color;
            pCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            pCtx.restore();
        });

        requestAnimationFrame(animateParticles);
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            customModal.classList.remove('active');
        }
        if (e.code === 'Space' && !jackpotModal.classList.contains('active') && !customModal.classList.contains('active')) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            e.preventDefault();
            if (currentMode === 'wheel') spinWheel();
            if (currentMode === 'slots') spinSlots();
            if (currentMode === 'cards') dealCardHand();
        }
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        resizeParticles();
    });

    initWheelSectors();
    resizeCanvas();
    resizeParticles();
    updateAudioButton();
    applyLanguage(currentLang);
});
