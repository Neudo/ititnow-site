import AuthButton from "../components/AuthButton";
import iphone from "./assets/images/iphone-home.png"
import badgeApple from "./assets/images/badge-apple.png"
import badgeAndroid from "./assets/images/badge-android.png"
import barParis from "./assets/images/bar-paris.jpg"
import Container from "../components/Container";
import iphoneAuth from "./assets/images/iphone-auth.png"
export default async function Index() {

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <AuthButton />
                </div>
            </nav>

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-6xl px-3">

                <main>
                    <Container>
                    <div className="min-w-[300px] md:w-1/2 relative flex justify-center">
                        <img src={iphone.src} alt="Iphone mokup"
                             className="rounded-lg absolute right-[-35px] bottom-2 scale-75 hidden md:block"/>
                        <img src={barParis.src} alt="bar paris"
                             className="rounded-lg shadow-lg w-full max-w-[350px] object-cover"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="font-bold text-4xl mb-2">Découvrez de nouveaux restaurants</h2>
                        <p>Vous indiquez vos préférences, on vous propose des restaux en fonction de vos goûts.
                            Explorez des établissements uniques près de chez vous que vous n'auriez peut-être jamais trouvés autrement.
                            Soyez informé en avant-première des événements spéciaux et des promotions des restaurateurs.</p>
                        <div className="flex gap-4 mt-6">
                            <img src={badgeApple.src} alt="Badge apple"/>
                            <img src={badgeAndroid.src} alt="Badge android"/>
                        </div>
                    </div>
                    </Container>

                    <Container>
                        <div className="">
                            <h2 className="font-bold text-4xl mb-2">Connectez-vous afin d’accéder
                                à plus de fonctionnalités</h2>
                            <p>Ajouter des restaurants à vos favoris : Gardez une liste de vos endroits préférés pour les retrouver facilement plus tard.</p>
                            <div className="p-5 mt-[22px] relative max-w-[315px] secondary text-center rounded-lg">
                                <a className="font-bold " href="/login">Connexion</a>
                            </div>
                        </div>
                        <div className="w-[250px]">
                            <img src={iphoneAuth.src} alt=""/>
                        </div>
                    </Container>

                    <Container>
                        <div className="text-center">
                            <h2 className="font-bold text-4xl mb-2">Accédez aux évènements du moment.</h2>
                            <p>Vous êtes restaurateur ? Boostez votre visibilité en publiant vos événements sur notre plateforme ! Qu'il s'agisse de soirées à thème, de dégustations exclusives ou de promotions spéciales, notre application vous permet de toucher une audience large et diversifiée, passionnée par la découverte de nouveaux établissements. Rejoignez-nous et faites connaître vos événements en quelques clics !</p>
                            <div className="p-5 mt-[22px] relative max-w-[315px] secondary text-center rounded-lg mx-auto">
                                <a className="font-bold" href="/login">Connexion</a>
                            </div>
                        </div>
                    </Container>

                </main>
            </div>

            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
                <p>
                    Copyright - Ititnow
                </p>
            </footer>
        </div>
    );
}
