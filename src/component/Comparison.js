import axios from 'axios';
import React, { useState } from 'react';

// Données du quiz
const quizData = [
    {
        question: "Quel âge avez-vous ?",
        // icon: "fas fa-user",
        iconColor: "text-blue-600",
        options: [
            { text: "18-25 ans", icon: "fas fa-graduation-cap" },
            { text: "26-35 ans", icon: "fas fa-briefcase" },
            { text: "36-45 ans", icon: "fas fa-chart-line" },
            { text: "46-55 ans", icon: "fas fa-award" },
            { text: "56-65 ans", icon: "fas fa-crown" },

        ],
        type: "info"
    },
    {
        question: "Dans quel canton habitez-vous ?",
        // icon: "fas fa-map-marker-alt",
        iconColor: "text-green-600",
        options: [

            { text: "Genève", icon: "fas fa-globe" },
            { text: "Zurich", icon: "fas fa-city" },

            { text: "Valais", icon: "fas fa-mountain" },
            { text: "Autre canton", icon: "fas fa-map-pin" }
        ],
        type: "info"
    },
    {
        question: "Quelle est votre situation familiale ?",
        // icon: "fas fa-users",
        iconColor: "text-purple-600",
        options: [
            { text: "Célibataire", icon: "fas fa-user" },
            { text: "En couple", icon: "fas fa-heart" },
            { text: "Famille avec enfants", icon: "fas fa-home" },
            { text: "Senior", icon: "fas fa-user-check" }
        ],
        type: "info"
    },

    {
        question: "Quel type de couverture recherchez-vous ?",
        // icon: "fas fa-shield-alt",
        iconColor: "text-teal-600",
        options: [
            { text: "Assurance de base uniquement", icon: "fas fa-check-circle" },
            { text: "Base + Complémentaire", icon: "fas fa-plus-circle" },
            { text: "Couverture complète", icon: "fas fa-star" },
            { text: "Je ne sais pas", icon: "fas fa-question-circle" }
        ],
        type: "info"
    },

    {
        question: "À quelle fréquence consultez-vous un médecin ?",
        // icon: "fas fa-stethoscope",
        iconColor: "text-blue-600",
        options: [
            { text: "Rarement (1-2 fois/an)", icon: "fas fa-battery-quarter" },
            { text: "Occasionnellement (3-5 fois/an)", icon: "fas fa-battery-half" },
            { text: "Régulièrement (6-10 fois/an)", icon: "fas fa-battery-three-quarters" },
            { text: "Fréquemment (plus de 10 fois/an)", icon: "fas fa-battery-full" }
        ],
        type: "info"
    },

    {
        question: "Quel est votre budget mensuel maximum ?",
        icon: "fas fa-wallet",
        // iconColor: "text-purple-600",
        options: [
            { text: "Moins de 400 CHF", icon: "fas fa-dollar-sign text-green-600" },
            { text: "400-600 CHF", icon: "fas fa-dollar-sign text-blue-600" },
            { text: "600-800 CHF", icon: "fas fa-dollar-sign text-purple-600" },
            { text: "Plus de 800 CHF", icon: "fas fa-dollar-sign text-orange-600" }
        ],
        type: "info"
    },

];

// Composant Progress Bar
const ProgressBar = ({ current, total, score }) => {
    const progress = (current / total) * 100;

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <i className="fas fa-question text-white text-sm"></i>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Question</div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                            {current} sur {total}
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

// Composant Option Answer
const AnswerOption = ({ option, index, isSelected, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(index)}
            className={`answer-option group relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-102 hover:shadow-lg p-5 ${isSelected
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
        >
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isSelected
                        ? 'bg-white text-blue-600'
                        : 'bg-gray-100 dark:bg-gray-600 group-hover:bg-blue-600 group-hover:text-white'
                        }`}>
                        <i className={`${option.icon} text-lg`}></i>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="text-lg font-medium">
                        {option.text}
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected
                        ? 'border-white'
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-600'
                        }`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant Welcome Screen
const WelcomeScreen = ({ onStart }) => {
    return (
        <div className="text-center animate-scale-in">


            <button
                onClick={onStart}
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
                <span className="flex items-center justify-center">
                    Commencer maintenant
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                </span>
            </button>
        </div>
    );
};

// Composant Question Screen
const QuestionScreen = ({
    question,
    currentIndex,
    totalQuestions,
    score,
    selectedAnswer,
    onAnswerSelect,
    onNext,
    onPrevious
}) => {
    const isLastQuestion = currentIndex === totalQuestions - 1;

    return (
        <div className="animate-fade-in">
            <ProgressBar
                current={currentIndex + 1}
                total={totalQuestions}
                score={score}
            />

            <div className="mb-8">
                {/* <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                        <i className={`${question.icon} text-2xl ${question.iconColor}`}></i>
                    </div>
                </div> */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed text-center">
                    {question.question}
                </h3>
                <div className="space-y-4 py-0">
                    {question.options.map((option, index) => (
                        <AnswerOption
                            key={index}
                            option={option}
                            index={index}
                            isSelected={selectedAnswer === index}
                            onSelect={onAnswerSelect}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center pt-6">
                {currentIndex > 0 ? (
                    <button
                        onClick={onPrevious}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium text-base"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Précédent
                    </button>
                ) : <div></div>}

                <button
                    onClick={onNext}
                    disabled={selectedAnswer === null}
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <span className="flex items-center">
                        {selectedAnswer === null
                            ? 'Sélectionnez une réponse'
                            : isLastQuestion
                                ? 'Voir les résultats'
                                : 'Question suivante'
                        }
                        <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                    </span>
                </button>
            </div>
        </div>
    );
};

// Composant Results Screen
const ResultsScreen = ({ totalQuestions, onRestart, onShare }) => {


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        adresse:'',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");

        try {
          const res = await axios.post("https://server-assurance.onrender.com/users/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setSuccess("Merci ! Nos conseillers vous rappellent bientôt ✨");
            setFormData({ firstName: "", lastName: "", phone: "", adresse :""});
        } catch (error) {
            console.error(error);
            setSuccess("Une erreur est survenue, veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };



    return (
     
        <div className="question-card glass rounded-3xl p-10 shadow-2xl absolute inset-0 overflow-hidden" id="results-form">
            {/* Arrière-plan animé avec particules */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Particules flottantes animées */}
                <div className="floating-particles">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                    <div className="particle particle-4"></div>
                    <div className="particle particle-5"></div>
                    <div className="particle particle-6"></div>
                </div>

                {/* Formes géométriques animées */}
                <div className="geometric-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                {/* Vagues animées */}
                <div className="animated-waves">
                    <div className="wave wave-1"></div>
                    <div className="wave wave-2"></div>
                    <div className="wave wave-3"></div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="relative z-10">
                <div className="text-center mb-10">
                    {/* Icône magique animée */}
                    <div className="magical-icon mb-6">
                        <div className="icon-container">
                            <div className="magic-wand">✨</div>
                            <div className="sparkles">
                                <span className="sparkle sparkle-1">⭐</span>
                                <span className="sparkle sparkle-2">💎</span>
                                <span className="sparkle sparkle-3">🌟</span>
                                <span className="sparkle sparkle-4">✨</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-2xl  mb-8 animate-text-glow">
                        Notre comparateur a trouvé <span className="font-bold text-yellow-300 magical-text">les meilleures offres d'assurance</span> qui s’adaptent à vos besoins et pourraient vous faire économiser jusqu'à
                    </p>


                    {/* Montant des économies avec effet spectaculaire */}
                    <div className="savings-display mb-8">
                        <div className="text-6xl font-bold gradient-text-animated mb-4" id="potential-savings">
                            <span className="number-counter">1,680</span>
                            <span className="currency"> CHF/an</span>
                        </div>
                        <div className="savings-indicator">
                            <div className="indicator-bar"></div>
                            <div className="indicator-glow"></div>
                        </div>
                    </div>
                </div>
                <h3 className='text-xl text-center mb-5'>
                    Entrez votre numéro et nos conseillers d'assurance vous rappellent pour tout expliquer gratuitement.
                </h3>

                <form
                    className="max-w-2xl mx-auto space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-2 gap-6">
                        <div className="form-group">
                            <label className="block text-lg font-semibold mb-3 label-animated">
                                <span className="label-icon">✨</span>
                                <span className="label-text">Prénom *</span>
                            </label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="magical-input w-full px-6 py-4 border-2 border-transparent rounded-2xl bg-white/10 backdrop-blur-md text-lg transition-all duration-300"
                                    placeholder="Votre prénom magique"
                                />
                                <div className="input-glow"></div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="block text-lg font-semibold mb-3 label-animated">
                                <span className="label-icon">🌟</span>
                                <span className="label-text">Nom *</span>
                            </label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="magical-input w-full px-6 py-4 border-2 border-transparent rounded-2xl bg-white/10 backdrop-blur-md text-lg transition-all duration-300"
                                    placeholder="Votre nom"
                                />
                                <div className="input-glow"></div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                    <div className="form-group">
                        <label className="block text-lg font-semibold mb-3 label-animated">
                            <span className="label-icon">📱</span>
                            <span className="label-text">Téléphone *</span>
                        </label>
                        <div className="input-container">
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="magical-input w-full px-6 py-4 border-2 border-transparent rounded-2xl bg-white/10 backdrop-blur-md text-lg transition-all duration-300"
                                placeholder="76 123 45 67"
                            />
                            <div className="input-glow"></div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="block text-lg font-semibold mb-3 label-animated">
                            <span className="label-icon">📱</span>
                            <span className="label-text">Adresse *</span>
                        </label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                                required
                                className="magical-input w-full px-6 py-4 border-2 border-transparent rounded-2xl bg-white/10 backdrop-blur-md text-lg transition-all duration-300"
                                placeholder="rue 7400"
                            />
                            <div className="input-glow"></div>
                        </div>
                    </div>
                    </div>

                    {/* Éléments de confiance */}
                    <div className="trust-elements grid grid-cols-3 gap-4 py-6">
                        <div className="trust-card">
                            <div className="trust-icon">🔒</div>
                            <div className="trust-text">100% sécurisé</div>
                            <div className="trust-glow"></div>
                        </div>
                        <div className="trust-card">
                            <div className="trust-icon">⚡</div>
                            <div className="trust-text">Envoi instantané</div>
                            <div className="trust-glow"></div>
                        </div>
                        <div className="trust-card">
                            <div className="trust-icon">🆓</div>
                            <div className="trust-text">Totalement gratuit</div>
                            <div className="trust-glow"></div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-yellow-300 text-black rounded-2xl text-lg font-bold hover:bg-yellow-400 transition-colors"
                        disabled={loading}
                    >
                        {loading ? "Envoi..." : "Envoyer"}
                    </button>

                    {success && <p className="text-center text-green-400 mt-4">{success}</p>}
                </form>
            </div>
        </div>



    );
};

// Composant Principal
const Comparison = () => {
    const [currentStep, setCurrentStep] = useState('quiz'); // 'welcome', 'quiz', 'results'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    const handleStart = () => {
        setCurrentStep('quiz');
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setUserAnswers([]);
    };

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNext = () => {
        // Enregistrer la réponse
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestionIndex] = {
            questionIndex: currentQuestionIndex,
            answerIndex: selectedAnswer,
            answerText: quizData[currentQuestionIndex].options[selectedAnswer].text
        };
        setUserAnswers(newUserAnswers);

        // Aller à la question suivante ou aux résultats
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setCurrentStep('results');
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            // Restaurer la réponse précédente si elle existe
            const previousAnswer = userAnswers[currentQuestionIndex - 1];
            setSelectedAnswer(previousAnswer ? previousAnswer.answerIndex : null);
        }
    };

    const handleRestart = () => {
        setCurrentStep('quiz');
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setUserAnswers([]);
    };

    const handleShare = () => {
        // Logique de partage (peut être connectée à une API)
        alert('Fonctionnalité de partage à implémenter !');
    };

    return (
        <div className="min-h-screen  bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">

            <style>{`




.glass {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1), 
      rgba(255, 255, 255, 0.05)
    );
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
  }

  /* Particules flottantes */
  .floating-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #fff, transparent);
    border-radius: 50%;
    opacity: 0.6;
    animation: float 6s ease-in-out infinite;
  }

  .particle-1 { top: 10%; left: 20%; animation-delay: 0s; }
  .particle-2 { top: 60%; left: 80%; animation-delay: 1s; }
  .particle-3 { top: 30%; left: 60%; animation-delay: 2s; }
  .particle-4 { top: 80%; left: 30%; animation-delay: 3s; }
  .particle-5 { top: 50%; left: 10%; animation-delay: 4s; }
  .particle-6 { top: 20%; left: 90%; animation-delay: 5s; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }

  /* Formes géométriques animées */
  .geometric-shapes {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .shape {
    position: absolute;
    opacity: 0.1;
    animation: rotate 20s linear infinite;
  }

  .shape-1 {
    top: 10%;
    right: 10%;
    width: 100px;
    height: 100px;
    background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  .shape-2 {
    bottom: 20%;
    left: 5%;
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 50%;
    animation-direction: reverse;
  }

  .shape-3 {
    top: 50%;
    right: 5%;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #f093fb, #f5576c);
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    animation-duration: 15s;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Vagues animées */
  .animated-waves {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    pointer-events: none;
    overflow: hidden;
  }

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      rgba(74, 144, 226, 0.1), 
      rgba(80, 200, 120, 0.1)
    );
    border-radius: 45%;
    animation: wave 10s ease-in-out infinite;
  }

  .wave-1 { animation-delay: 0s; }
  .wave-2 { animation-delay: 2s; opacity: 0.5; }
  .wave-3 { animation-delay: 4s; opacity: 0.3; }

  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
  }

  /* Icône magique */
  .magical-icon {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .icon-container {
    position: relative;
    display: inline-block;
  }

  .magic-wand {
    font-size: 4rem;
    animation: bounce 2s ease-in-out infinite;
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
  }

  .sparkles {
    position: absolute;
    inset: 0;
  }

  .sparkle {
    position: absolute;
    font-size: 1.5rem;
    animation: sparkle 3s ease-in-out infinite;
  }

  .sparkle-1 { top: -10px; left: -20px; animation-delay: 0s; }
  .sparkle-2 { top: -15px; right: -15px; animation-delay: 0.5s; }
  .sparkle-3 { bottom: -10px; left: -15px; animation-delay: 1s; }
  .sparkle-4 { bottom: -15px; right: -20px; animation-delay: 1.5s; }

  @keyframes bounce {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes sparkle {
    0%, 100% { 
      opacity: 0; 
      transform: scale(0.5) rotate(0deg); 
    }
    50% { 
      opacity: 1; 
      transform: scale(1.2) rotate(180deg); 
    }
  }

  /* Texte magique animé */
  .magical-text {
    background: linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4, #ffd700);
    background-size: 300% 300%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease-in-out infinite;
  }

  .animate-text-glow {
    animation: textGlow 4s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
    50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 215, 0, 0.6); }
  }

  /* Affichage des économies spectaculaire */
  .savings-display {
    position: relative;
    display: inline-block;
  }

  .gradient-text-animated {
    background: linear-gradient(45deg, 
      #ffd700, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffd700
    );
    background-size: 600% 600%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientFlow 4s ease-in-out infinite;
    filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.8));
  }

  @keyframes gradientFlow {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 100% 0%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
  }

  .number-counter {
    animation: countUp 2s ease-out;
  }

  @keyframes countUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .savings-indicator {
    position: relative;
    width: 200px;
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    margin: 0 auto;
    overflow: hidden;
  }

  .indicator-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 85%;
    background: linear-gradient(90deg, #ffd700, #ff6b6b);
    border-radius: 4px;
    animation: fillBar 3s ease-out;
  }

  .indicator-glow {
    position: absolute;
    left: 0;
    top: -2px;
    height: 12px;
    width: 20px;
    background: radial-gradient(ellipse, rgba(255, 215, 0, 0.8), transparent);
    border-radius: 50%;
    animation: glowMove 2s ease-in-out infinite;
  }

  @keyframes fillBar {
    from { width: 0%; }
    to { width: 85%; }
  }

  @keyframes glowMove {
    0%, 100% { left: 0%; }
    50% { left: 65%; }
  }

  /* Groupes de formulaires */
  .form-group {
    position: relative;
  }

  .label-animated {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .label-icon {
    font-size: 1.2rem;
    animation: labelPulse 2s ease-in-out infinite;
  }

  @keyframes labelPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  /* Inputs magiques */
  .input-container {
    position: relative;
  }

  .magical-input {
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
  }

  .magical-input:focus {
    outline: none;
    border-color: rgba(255, 215, 0, 0.8);
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .input-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.2), transparent);
    border-radius: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .magical-input:focus + .input-glow {
    opacity: 1;
    animation: inputGlow 2s ease-in-out infinite;
  }

  @keyframes inputGlow {
    0%, 100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.3); }
    50% { box-shadow: 0 0 25px rgba(255, 215, 0, 0.6); }
  }

  /* Éléments de confiance */
  .trust-elements {
    animation: trustSlideIn 1s ease-out 0.5s both;
  }

  .trust-card {
    position: relative;
    padding: 1rem;
    background: lightgray;
    border-radius: 1rem;
    text-align: center;
    transition: all 0.3s ease;
    overflow: hidden;
    cursor: pointer;
  }

  .trust-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  .trust-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    animation: trustIconFloat 3s ease-in-out infinite;
  }

  .trust-text {
    font-weight: bold;
    color: white;
    font-size: 0.9rem;
  }

  .trust-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .trust-card:hover .trust-glow {
    opacity: 1;
    animation: trustGlow 1.5s ease-in-out infinite;
  }

  @keyframes trustSlideIn {
    from { 
      opacity: 0; 
      transform: translateY(30px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @keyframes trustIconFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  @keyframes trustGlow {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
  }

  /* Bouton submit ultra spectaculaire */
  .submit-container {
    position: relative;
    animation: submitAppear 1s ease-out 1s both;
  }

  .magical-submit-btn {
    position: relative;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
    background-size: 300% 300%;
    color: white;
    border: none;
    cursor: pointer;
    overflow: hidden;
    animation: btnGradient 4s ease-in-out infinite;
  }

  .magical-submit-btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }

  .btn-text {
    position: relative;
    z-index: 3;
    display: block;
  }

  .btn-sparkles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
  }

  .btn-sparkle {
    position: absolute;
    font-size: 1.5rem;
    opacity: 0;
    animation: btnSparkle 3s ease-in-out infinite;
  }

  .btn-sparkle-1 { top: 20%; left: 10%; animation-delay: 0s; }
  .btn-sparkle-2 { top: 30%; right: 15%; animation-delay: 0.5s; }
  .btn-sparkle-3 { bottom: 25%; left: 20%; animation-delay: 1s; }
  .btn-sparkle-4 { bottom: 20%; right: 10%; animation-delay: 1.5s; }

  .btn-glow {
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #ffd700, transparent, #ffd700);
    border-radius: 1rem;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s ease;
  }

  .magical-submit-btn:hover .btn-glow {
    opacity: 1;
    animation: btnGlowPulse 2s ease-in-out infinite;
  }

  .btn-wave {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    z-index: 2;
  }

  .magical-submit-btn:hover .btn-wave {
    animation: btnWave 1.5s ease-in-out;
  }

  @keyframes submitAppear {
    from { 
      opacity: 0; 
      transform: translateY(50px) scale(0.9); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0) scale(1); 
    }
  }

  @keyframes btnGradient {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 100% 0%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
  }

  @keyframes btnSparkle {
    0%, 100% { 
      opacity: 0; 
      transform: scale(0.5) rotate(0deg); 
    }
    50% { 
      opacity: 1; 
      transform: scale(1.5) rotate(180deg); 
    }
  }

  @keyframes btnGlowPulse {
    0%, 100% { 
      opacity: 0.5; 
      transform: scale(1); 
    }
    50% { 
      opacity: 1; 
      transform: scale(1.05); 
    }
  }

  @keyframes btnWave {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .grid-cols-2 {
      grid-template-columns: 1fr;
    }
    
    .trust-elements {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .text-6xl {
      font-size: 3rem;
    }
    
    .text-2xl {
      font-size: 1.5rem;
    }
  }




        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes rotating {
          from { transform: perspective(1000px) rotateX(-15deg) rotateY(0); }
          to { transform: perspective(1000px) rotateX(-15deg) rotateY(360deg); }
        }
          
        
        .gradient-bg {
          background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .dark .glass-card {
          background: rgba(45, 52, 54, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .emoji-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .category-card:hover {
          transform: translateY(-10px) scale(1.05);
        }

        .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        .animate-pulse-slow { animation: pulse 4s infinite; }
        .animate-slide-up { animation: slideUp 0.6s ease-out; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-heart-beat { animation: heartBeat 1.5s ease-in-out infinite; }

     .wrapper {
    width: 100%;
    height: 100vh;
    /* plein écran */
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.inner {
    --w: 100px;
    --h: 150px;
    --translateZ: calc((var(--w) + var(--h)) + 0px);
    --rotateX: -15deg;
    --perspective: 1000px;
    position: absolute;
    width: var(--w);
    height: var(--h);
    top: 25%;
    left: calc(50% - (var(--w) / 2) - 2.5px);
    z-index: 2;
    transform-style: preserve-3d;
    transform: perspective(var(--perspective));
    animation: rotating 20s linear infinite;
}

@keyframes rotating {
    from {
        transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0);
    }

    to {
        transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(1turn);
    }
}

.card {
    position: absolute;
    border: 2px solid rgba(var(--color-card));
    border-radius: 12px;
    overflow: hidden;
    inset: 0;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
}

.img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #0000 radial-gradient(circle,
            rgba(var(--color-card), 0.2) 0%,
            rgba(var(--color-card), 0.6) 80%,
            rgba(var(--color-card), 0.9) 100%);
}
      `}</style>
            {/* Floating particles background */}


            <div className="absolute top-40 left-10 text-3xl emoji-float " style={{ animationDelay: '0s' }}>💊</div>
            <div className="absolute top-32 right-20 text-4xl emoji-float" style={{ animationDelay: '1s' }}>🩺</div>
            <div className="absolute bottom-20 left-20 text-4xl emoji-float" style={{ animationDelay: '2s' }}>💰</div>
            <div className="absolute top-1/2 right-10 text-5xl emoji-float" style={{ animationDelay: '3s' }}>🎯</div>

            <div className="w-full max-w-3xl relative z-10 mt-[100px]">
                {/* Header */}

            
                {/* Quiz Container */}
                {/* {currentStep === 'welcome' && (
                        <WelcomeScreen onStart={handleStart} />
                    )} */}

                {currentStep === 'quiz' && (
                    <QuestionScreen
                        question={quizData[currentQuestionIndex]}
                        currentIndex={currentQuestionIndex}
                        totalQuestions={quizData.length}
                        score={score}
                        selectedAnswer={selectedAnswer}
                        onAnswerSelect={handleAnswerSelect}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onStart={handleStart}
                    />
                )}

                {currentStep === 'results' && (
                    <ResultsScreen
                        totalQuestions={quizData.length}
                        onRestart={handleRestart}
                        onShare={handleShare}
                    />
                )}
            </div>
        </div>

    );
};

export default Comparison;