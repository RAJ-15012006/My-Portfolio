document.addEventListener('DOMContentLoaded', () => {
    
    // --- PAGE LOADER ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        initAnimations(); // Start animations after loader hides
    }, 2000);

    // --- CURRENT YEAR ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- CUSTOM CURSOR ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Slight delay for the ring
        setTimeout(() => {
            cursorRing.style.left = `${posX}px`;
            cursorRing.style.top = `${posY}px`;
        }, 50);
    });

    // Hover effect on clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // --- NAVBAR ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link highlighting
        const sections = document.querySelectorAll('section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // --- INITIALIZE LIBRARIES ---
    
    // AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // Vanilla Tilt
    VanillaTilt.init(document.querySelectorAll(".tilt-element"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // Typed.js
    new Typed('#typed-text', {
        strings: [
            'AI Engineer Enthusiast',
            'Data Scientist Enthusiast',
            'ML Engineer Enthusiast'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false
    });

    // --- COUNTER UP ANIMATION ---
    const counters = document.querySelectorAll('.counter');
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    };
    const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // --- PROGRESS BAR ANIMATION ---
    const progressFills = document.querySelectorAll('.progress-fill');
    const animateProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.width = el.getAttribute('data-width');
                observer.unobserve(el);
            }
        });
    };
    const progressObserver = new IntersectionObserver(animateProgress, { threshold: 0.5 });
    progressFills.forEach(fill => progressObserver.observe(fill));


    // --- CHART.JS METRICS ---
    
    // 1. Radar Chart (Skills)
    const ctxRadar = document.getElementById('skillsRadar')?.getContext('2d');
    if (ctxRadar) {
        new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: ['Machine Learning', 'Data Eng', 'Cloud/DevOps', 'Data Viz', 'Algorithms', 'Deep Learning'],
                datasets: [{
                    label: 'Proficiency',
                    data: [95, 85, 75, 90, 88, 92],
                    backgroundColor: 'rgba(0, 245, 255, 0.2)',
                    borderColor: '#00F5FF',
                    pointBackgroundColor: '#FFB800',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#FFB800',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: {
                            color: '#94A3B8',
                            font: { family: "'Space Mono', monospace", size: 10 }
                        },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 2. Sparklines (Projects)
    const createSparkline = (id, data, color) => {
        const ctx = document.getElementById(id)?.getContext('2d');
        if (!ctx) return;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1','2','3','4','5','6','7'],
                datasets: [{
                    data: data,
                    borderColor: color,
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                interaction: { mode: 'none' }
            }
        });
    };

    createSparkline('spark1', [65, 59, 80, 81, 56, 95, 100], '#00F5FF'); // NLP
    createSparkline('spark2', [28, 48, 40, 79, 86, 27, 90], '#FFB800'); // Dash
    createSparkline('spark3', [10, 25, 15, 60, 45, 80, 95], '#00F5FF'); // CV
    createSparkline('spark4', [45, 52, 38, 70, 65, 85, 92], '#FFB800'); // Time Series
    createSparkline('spark5', [30, 60, 45, 75, 55, 90, 85], '#00F5FF'); // Stock
    createSparkline('spark6', [20, 40, 60, 50, 80, 70, 95], '#FFB800'); // COVID

    // --- ADVANCED THREE.JS NEURAL NETWORK BACKGROUND ---
    const initThreeJS = () => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050A0E, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const group = new THREE.Group();
        scene.add(group);

        const particleCount = window.innerWidth < 768 ? 150 : 350;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorCyan = new THREE.Color(0x00F5FF);
        const colorGold = new THREE.Color(0xFFB800);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;     
            positions[i + 1] = (Math.random() - 0.5) * 20; 
            positions[i + 2] = (Math.random() - 0.5) * 15; 

            const mixedColor = Math.random() > 0.5 ? colorCyan : colorGold;
            colors[i] = mixedColor.r;
            colors[i + 1] = mixedColor.g;
            colors[i + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        group.add(particles);

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });
        
        const maxConnections = particleCount * 2;
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(maxConnections * 3 * 2);
        const lineColors = new Float32Array(maxConnections * 3 * 2);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
        lineGeometry.setDrawRange(0, 0);

        const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        group.add(linesMesh);

        camera.position.z = 5;

        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
        });

        const animate = () => {
            requestAnimationFrame(animate);

            group.rotation.y += 0.001;
            group.rotation.x += 0.0005;
            
            group.rotation.y += 0.05 * (mouseX - group.rotation.y);
            group.rotation.x += 0.05 * (mouseY - group.rotation.x);

            const pPositions = particles.geometry.attributes.position.array;
            const pColors = particles.geometry.attributes.color.array;
            
            for(let i=0; i<particleCount; i++) {
                 pPositions[i*3+1] += Math.sin(Date.now()*0.001 + i)*0.002;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            let vertexpos = 0;
            let colorpos = 0;
            let numConnected = 0;
            
            for ( let i = 0; i < particleCount; i++ ) {
                for ( let j = i + 1; j < particleCount; j++ ) {
                    const dx = pPositions[i*3] - pPositions[j*3];
                    const dy = pPositions[i*3+1] - pPositions[j*3+1];
                    const dz = pPositions[i*3+2] - pPositions[j*3+2];
                    const distSql = dx*dx + dy*dy + dz*dz;
                    
                    if(distSql < 5) { 
                        const alpha = 1.0 - (distSql / 5);
                        if(numConnected < maxConnections) {
                            linePositions[vertexpos++] = pPositions[i*3];
                            linePositions[vertexpos++] = pPositions[i*3+1];
                            linePositions[vertexpos++] = pPositions[i*3+2];

                            linePositions[vertexpos++] = pPositions[j*3];
                            linePositions[vertexpos++] = pPositions[j*3+1];
                            linePositions[vertexpos++] = pPositions[j*3+2];

                            lineColors[colorpos++] = pColors[i*3] * alpha;
                            lineColors[colorpos++] = pColors[i*3+1] * alpha;
                            lineColors[colorpos++] = pColors[i*3+2] * alpha;

                            lineColors[colorpos++] = pColors[j*3] * alpha;
                            lineColors[colorpos++] = pColors[j*3+1] * alpha;
                            lineColors[colorpos++] = pColors[j*3+2] * alpha;
                            
                            numConnected++;
                        }
                    }
                }
            }
            linesMesh.geometry.setDrawRange(0, numConnected * 2);
            linesMesh.geometry.attributes.position.needsUpdate = true;
            linesMesh.geometry.attributes.color.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    initThreeJS();

    // --- GSAP ANIMATIONS ---
    const initAnimations = () => {
        // Hero Title Text Reveal
        const title = document.getElementById('hero-title');
        if(title) {
            // Split text into characters for staggered animation
            const text = title.innerText;
            title.innerHTML = '';
            for (let char of text) {
                const span = document.createElement('span');
                span.innerText = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.display = 'inline-block';
                title.appendChild(span);
            }

            // GSAP Timeline
            const tl = gsap.timeline();
            tl.to(title, { opacity: 1, y: 0, duration: 0.1 }) // Wrapper reveal
              .to('#hero-title span', {
                  opacity: 1,
                  y: -20,
                  duration: 0.5,
                  stagger: 0.05,
                  ease: "back.out(1.7)",
              })
              .to('#hero-title span', {
                  y: 0,
                  duration: 0.3,
                  stagger: 0.05,
                  ease: "bounce.out"
              }, "-=0.4");
        }
    };

    // --- FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';
            btn.style.pointerEvents = 'none';
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Transmission Successful';
                btn.style.background = '#00F5FF';
                btn.style.color = '#000';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    // --- AI CHATBOT LOGIC ---
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const closeBot = document.getElementById('close-bot');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chatbot-messages');

    if(chatToggle && chatWindow) {

        const KB = [
            {
                keys: ['hi','hello','hey','sup','greet'],
                reply: "Hey there! 👋 I'm Raj's AI assistant. I can tell you about his education, AI projects, special mentorship offers, or how to contact him directly!",
                chips: ['🎓 Education', '🔥 Special Offer', '🛠️ Skills', '📞 Contact']
            },
            {
                keys: ['college','university','parul','education','degree','b.tech','btech','graduating','2027'],
                reply: "🎓 Raj is a B.Tech student at Parul University, graduating in 2027. He's deeply involved in the AI & ML department!",
                chips: ['🤖 AIML Interests', '💼 Projects', '📞 Contact']
            },
            {
                keys: ['aiml','ai ml','enthusiast','interest','passion'],
                reply: "🤖 Raj is an AIML enthusiast! He specializes in building real-world AI systems, including RAG models, Agentic AI, and custom ML pipelines. He's always looking to push the boundaries of what's possible with data.",
                chips: ['💼 Projects', '📜 Certifications', '🔥 Special Offer']
            },
            {
                keys: ['offer','special','chhath puja','discount','50%','mentorship','save','plan'],
                reply: "🔥 CHHATH PUJA SPECIAL OFFER! 🔥\n\nRaj is currently offering 50% OFF on all Mentorship Plans! Whether you want to master Datasets, build Real-World Projects, or get 1-on-1 coaching, now is the best time to enroll.\n\nClick 'View Plans' or 'Grab Offer' on the screen to see the details!",
                chips: ['🚀 Pro Plan', '⚡ Ultimate Plan', '📞 Contact']
            },
            {
                keys: ['contact','email','hire','reach','connect','phone','mail','number','call','whatsapp'],
                reply: "📞 You can reach Raj directly here:\n\n📧 Email: rajkumar20053773@gmail.com\n📱 Phone: +91 8591296816\n\nHe's available for freelance, full-time roles, or just a quick tech chat!",
                chips: ['🐙 GitHub', '💼 LinkedIn', '🏠 Main Menu']
            },
            {
                keys: ['skill','tech','stack','know','language','python','tool'],
                reply: "🛠️ Raj's tech stack:\n\n• Languages: Python, Java, SQL\n• AI: RAG, Agentic AI, CrewAI, LangChain, LLMs\n• Data: Scikit-Learn, Pandas, Power BI, Tableau\n• Cloud: Azure AI/Data Scientist certified",
                chips: ['💼 Projects', '📜 Certifications', '🏠 Main Menu']
            },
            {
                keys: ['project','built','shipped','work','portfolio','app','demo'],
                reply: "💼 Featured Projects:\n\n🌸 RAG Model Flower (Live!)\n📊 Zomato Analytics Dashboard\n🧠 NLP Sentiment Engine\n📈 Stock Market Prediction\n\nAll his work is meticulously documented on GitHub!",
                chips: ['🌐 Live Demos', '🐙 GitHub', '📞 Contact']
            },
            {
                keys: ['who','about','yourself','raj','tell me'],
                reply: "👨‍💻 Raj Samrendra Kumar is an AI Engineer & Data Scientist enthusiast currently graduating in 2027. He's a problem-solver who loves turning complex data into smart AI solutions! 🚀",
                chips: ['🎓 Education', '🛠️ Skills', '🔥 Special Offer']
            },
            {
                keys: ['home','menu','restart','main'],
                reply: "Back to the start! How else can I help you today?",
                chips: ['🎓 Education', '🛠️ Skills', '💼 Projects', '📞 Contact']
            }
        ];

        const chipMap = {
            '🎓 Education': 'college',
            '🛠️ Skills': 'skills',
            '🤖 AIML Interests': 'aiml',
            '💼 Projects': 'projects',
            '📜 Certifications': 'certifications',
            '🌐 Live Demos': 'live demo',
            '📞 Contact': 'contact',
            '🔥 Special Offer': 'offer',
            '🚀 Pro Plan': 'offer',
            '⚡ Ultimate Plan': 'offer',
            '🐙 GitHub': 'github',
            '💼 LinkedIn': 'linkedin',
            '🏠 Main Menu': 'home'
        };

        const getBotResponse = (input) => {
            const text = input.toLowerCase();
            for (const item of KB) {
                if (item.keys.some(k => text.includes(k))) {
                    return { reply: item.reply, chips: item.chips || [] };
                }
            }
            return { reply: "🤔 I'm not sure about that, but Raj would love to answer! Reach him at rajkumar20053773@gmail.com or use the Contact section below.", chips: ['📞 Contact','💼 Projects','🛠️ Skills'] };
        };

        const removeChips = () => {
            chatMessages.querySelectorAll('.chip-row').forEach(el => el.remove());
        };

        const addChips = (chips) => {
            if (!chips || chips.length === 0) return;
            const row = document.createElement('div');
            row.classList.add('chip-row');
            chips.forEach(label => {
                const btn = document.createElement('button');
                btn.classList.add('chip-btn');
                btn.textContent = label;
                btn.addEventListener('click', () => {
                    removeChips();
                    processInput(chipMap[label] || label);
                });
                row.appendChild(btn);
            });
            chatMessages.appendChild(row);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const addMessage = (text, sender) => {
            removeChips();
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('msg', sender === 'user' ? 'user-msg' : 'bot-msg');
            msgDiv.style.whiteSpace = 'pre-wrap';
            msgDiv.innerText = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const processInput = (text) => {
            addMessage(text, 'user');
            const typingId = 'typing-' + Date.now();
            const typingMsg = document.createElement('div');
            typingMsg.classList.add('msg', 'bot-msg', 'typing');
            typingMsg.id = typingId;
            typingMsg.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
            chatMessages.appendChild(typingMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            setTimeout(() => {
                const typingEl = document.getElementById(typingId);
                if (typingEl) typingEl.remove();
                const { reply, chips } = getBotResponse(text);
                addMessage(reply, 'bot');
                addChips(chips);
            }, Math.random() * 600 + 400);
        };

        const handleChat = () => {
            const text = chatInput.value.trim();
            if (!text) return;
            chatInput.value = '';
            processInput(text);
        };

        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
            chatToggle.classList.add('hidden');
            if (chatWindow.classList.contains('active')) {
                setTimeout(() => chatInput.focus(), 300);
            }
        });

        closeBot.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            chatToggle.classList.remove('hidden');
        });

        chatSend.addEventListener('click', handleChat);
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });

        // Welcome chips on load
        setTimeout(() => {
            addChips(['🎓 Education','🛠️ Skills','💼 Projects','📜 Certifications','📞 Contact']);
        }, 500);
    }

});
