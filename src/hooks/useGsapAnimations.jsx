import { useEffect, useRef } from "react";

const getScopedElements = (root, selector) => {
    const elements = [...root.querySelectorAll(selector)];

    if (root.matches?.(selector)) {
        elements.unshift(root);
    }

    return elements.filter((element) => element.dataset.gsapAnimated !== "true");
};

const markAnimated = (elements) => {
    elements.forEach((element) => {
        element.dataset.gsapAnimated = "true";
    });

    return elements;
};

const getStaggerChildren = (parent) => {
    return [...parent.children].filter((child) => child.dataset.gsapAnimatedChild !== "true");
};

const markChildAnimations = (children) => {
    children.forEach((child) => {
        child.dataset.gsapAnimatedChild = "true";
    });

    return children;
};

const getGsap = async () => {
    const [gsapModule, scrollTriggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
    ]);

    const gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger ?? scrollTriggerModule.default;

    gsap.registerPlugin(ScrollTrigger);

    return { gsap, ScrollTrigger };
};

const canAnimate = () => {
    return typeof window !== "undefined"
        && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const resetAnimationMarkers = (root) => {
    const markedElements = [
        ...(root.matches?.("[data-gsap-animated]") ? [root] : []),
        ...root.querySelectorAll("[data-gsap-animated]"),
    ];
    const markedChildren = [
        ...(root.matches?.("[data-gsap-animated-child]") ? [root] : []),
        ...root.querySelectorAll("[data-gsap-animated-child]"),
    ];

    markedElements.forEach((element) => {
        delete element.dataset.gsapAnimated;
    });
    markedChildren.forEach((element) => {
        delete element.dataset.gsapAnimatedChild;
    });
};

export const useGsapAnimations = (animationKey) => {
    const scopeRef = useRef(null);

    useEffect(() => {
        const root = scopeRef.current;

        if (!root || !canAnimate()) {
            return undefined;
        }

        let context;
        let active = true;

        const runAnimations = async () => {
            const { gsap, ScrollTrigger } = await getGsap();

            if (!active || !scopeRef.current) return;

            context = gsap.context(() => {
                const heroSections = markAnimated(getScopedElements(root, "[data-animate='hero']"));
                heroSections.forEach((section) => {
                    const heroItems = [...section.querySelectorAll("[data-animate-item]")];

                    if (heroItems.length) {
                        gsap.fromTo(
                            heroItems,
                            { autoAlpha: 0, y: 34, scale: 0.98 },
                            {
                                autoAlpha: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.85,
                                ease: "power3.out",
                                stagger: 0.1,
                            }
                        );
                    }
                });

                const fadeItems = markAnimated(getScopedElements(root, "[data-animate='fade-up']"));
                if (fadeItems.length) {
                    gsap.set(fadeItems, { autoAlpha: 0, y: 34 });
                    ScrollTrigger.batch(fadeItems, {
                        start: "top 88%",
                        once: true,
                        onEnter: (batch) => {
                            gsap.to(batch, {
                                autoAlpha: 1,
                                y: 0,
                                duration: 0.7,
                                ease: "power3.out",
                                stagger: 0.07,
                            });
                        },
                    });
                }

                const staggerParents = markAnimated(getScopedElements(root, "[data-animate='stagger']"));
                staggerParents.forEach((parent) => {
                    const children = markChildAnimations(getStaggerChildren(parent));

                    if (!children.length) return;

                    gsap.set(children, { autoAlpha: 0, y: 28, scale: 0.98 });
                    gsap.to(children, {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.65,
                        ease: "power3.out",
                        stagger: 0.06,
                        scrollTrigger: {
                            trigger: parent,
                            start: "top 86%",
                            once: true,
                        },
                    });
                });

                const dashboardSections = markAnimated(getScopedElements(root, "[data-animate='dashboard']"));
                dashboardSections.forEach((section) => {
                    const children = markChildAnimations(getStaggerChildren(section));

                    if (!children.length) return;

                    gsap.set(children, { autoAlpha: 0, y: 22 });
                    gsap.to(children, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.55,
                        ease: "power2.out",
                        stagger: 0.05,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 90%",
                            once: true,
                        },
                    });
                });

                const floatingItems = markAnimated(getScopedElements(root, "[data-animate='float']"));
                floatingItems.forEach((element) => {
                    gsap.to(element, {
                        y: -6,
                        duration: 2.4,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                    });
                });
            }, root);

            ScrollTrigger.refresh();
        };

        runAnimations();

        return () => {
            active = false;
            context?.revert();
            resetAnimationMarkers(root);
        };
    }, [animationKey]);

    return scopeRef;
};
