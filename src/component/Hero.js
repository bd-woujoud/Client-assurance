import { ArrowRight, Shield, TrendingDown, Users } from "lucide-react";

import "./hero.css"


const Hero= () => {
    return (
        <section className="hero-section position-relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden">
            {/* Background gradient */}
            <div className="position-absolute top-0 start-0 w-100 h-100 hero-gradient"></div>

            {/* Floating background elements */}
            <div className="position-absolute floating-element-1 bg-white-10 rounded-circle blur-xl float"></div>
            <div className="position-absolute floating-element-2 bg-white-5 rounded-circle blur-2xl float" style={{ animationDelay: "2s" }}></div>
            <div className="position-absolute floating-element-3 bg-white-15 rounded-circle blur-lg float" style={{ animationDelay: "4s" }}></div>


            <div className="container py-5 position-relative" style={{ zIndex: 10 }}>
                <div className="row g-5 align-items-center">
                    {/* Content */}
                    <div className="col-lg-6 text-center text-lg-start animate-fade-in">
                        <h1 className="display-1 fw-bold text-white mb-4 lh-sm">
                            Trouvez l'assurance <span className="gradient-text-accent">parfaite</span> en Suisse
                        </h1>
                        <p className="fs-4 text-white-90 mb-4 lh-base">
                            Comparez les meilleures offres d'assurance maladie suisse en 2 minutes.
                            <strong className="text-white"> Économisez jusqu'à 40% sur vos primes!</strong>
                        </p>

                        {/* Trust indicators */}
                        <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4 mb-4 text-white-80">
                            <div className="d-flex align-items-center gap-2">
                                <Shield className="text-accent" size={20} />
                                <span>Sécurisé & Gratuit</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <TrendingDown className="text-accent" size={20} />
                                <span>Économies garanties</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <Users className="text-accent" size={20} />
                                <span>+50'000 familles</span>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                            <button
                                className="btn btn-cta btn-lg animate-bounce-in"
                                onClick={() => document.getElementById('comparison-quiz')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Commencer ma comparaison
                                <ArrowRight className="ms-2" size={24} />
                            </button>
                            <button
                                className="btn btn-outline-light btn-lg bg-white-10 border-white-30 animate-slide-in-right"
                                style={{ animationDelay: "0.3s" }}
                            >
                                En savoir plus
                            </button>
                        </div>

                        {/* Social proof */}
                        <div className="mt-5 animate-scale-in" style={{ animationDelay: "0.6s" }}>
                            <p className="text-white-70 small mb-3">Déjà utilisé par:</p>
                            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4 opacity-75">
                                <div className="text-white fw-semibold">CSS Assurance</div>
                                <div className="text-white fw-semibold">Swica</div>
                                <div className="text-white fw-semibold">Helsana</div>
                                <div className="text-white fw-semibold">Concordia</div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="col-lg-6 position-relative animate-slide-in-right">
            
                        <div className="bg-dark text-light d-flex flex-column align-items-center">
                         

                            <div className="wrapper mt-5">
                                <div className="inner" style={{ "--quantity": 10 }}>
                                    <div className="card" style={{ "--index": 0, "--color-card": "142, 249, 252" }}>
                                        <div className="img d-flex align-items-center justify-content-center">
                                            <span className="fw-bold">1</span>
                                        </div>
                                    </div>
                                    <div className="card" style={{ "--index": 1, "--color-card": "142, 252, 204" }}>
                                        <div className="img d-flex align-items-center justify-content-center">
                                            <span className="fw-bold">2</span>
                                        </div>
                                    </div>
                                    <div className="card" style={{ "--index": 2, "--color-card": "142, 252, 157" }}>
                                        <div className="img d-flex align-items-center justify-content-center">
                                            <span className="fw-bold">3</span>
                                        </div>
                                    </div>
                                    <div className="card" style={{ "--index": 3, "--color-card": "215, 252, 142" }}>
                                        <div className="img d-flex align-items-center justify-content-center">
                                            <span className="fw-bold">4</span>
                                        </div>
                                    </div>
                                    <div className="card" style={{ "--index": 4, "--color-card": "252, 252, 142" }}>
                                        <div className="img d-flex align-items-center justify-content-center">
                                            <span className="fw-bold">5</span>
                                        </div>
                                    </div>
                                    <div className="card" style={{ "--index": 5, "--color-card": "252, 208, 142" }}>
                                        <div className="img d-flex align-items-center justify-content-center">
                                            <span className="fw-bold">6</span>
                                        </div>
                                    </div>
                                    <div className="card" style={{ "--index": 6, "--color-card": "252, 142, 142" }}>
                                        <div className="img d-flex align-items-center justify-content-center">
                                            <span className="fw-bold">7</span>
                                        </div>
                                    </div>
                                    <div className="card" style={{ "--index": 7, "--color-card": "252, 142, 239" }}>
                                        <div className="img d-flex align-items-center justify-content-center">
                                            <span className="fw-bold">8</span>
                                        </div>
                                    </div>
                                    <div className="card" style={{ "--index": 8, "--color-card": "204, 142, 252" }}>
                                        <div className="img d-flex align-items-center justify-content-center">
                                            <span className="fw-bold">9</span>
                                        </div>
                                    </div>
                                    <div className="card" style={{ "--index": 9, "--color-card": "142, 202, 252" }}>
                                        <div className="img d-flex align-items-center justify-content-center">
                                            <span className="fw-bold">10</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
   

                      export default Hero;