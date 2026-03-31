import { Link } from "react-router";
import { LatestPosts } from "./latest-posts/LatestPosts.jsx";
import { LatestPractices } from "./latest-practices/LatestPractices.jsx";
import { endPoints } from "../../utils/endpoints.js";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch.js";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Slide } from "./slide/Slide.jsx";

export function Home() {
    useEffect(() => {
        document.title = "Начална страница | Моят Блог";
    }, []);

    const { data, isPending } = useFetch(endPoints.settings, {});

    const [isLoaded, setIsLoaded] = useState(false);

    const hasData = !isPending && !!data && Object.keys(data).length > 0;

    const isEmpty = !isPending && (!data || Object.keys(data).length === 0);

    const { data: slidersData, isPending: slidersIsPending } = useFetch(endPoints.sliders, []);

    var sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        adaptiveHeight: true,
    };
    
    return (
        <>
            <article className="header-image">
                {slidersIsPending ? (<div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>)
                    : (
                        <>
                            {slidersData && slidersData.length > 0 ? (
                                <Slider {...sliderSettings}>
                                    {slidersData.map(slide => (
                                        <Slide key={slide._id} imageUrl={slide.sliderImage} sliderContent={slide.sliderContent} />
                                    ))}
                                </Slider>
                            ) : (
                                <img src="/images/sample-content-header-image.avif" alt="Няма съдържание" />
                            )}
                        </>
                    )}
            </article>

            <article className="quick-links">
                <section>
                    <img src="/images/praktiki.svg" alt="Предстоящи практики" />
                    <div>
                        <h2>Предстоящи практики</h2>
                        <Link to="/practices" title="виж повече">виж повече</Link>
                    </div>
                </section>
                <section>
                    <img src="/images/novo.svg" alt="Ново в блога" />
                    <div>
                        <h2>Ново в блога</h2>
                        <Link to="/blogs" title="виж повече">виж повече</Link>
                    </div>
                </section>
                <section>
                    <img src="/images/author.svg" alt="За авторката" />
                    <div>
                        <h2>За авторката</h2>
                        <Link to="/about" title="виж повече">виж повече</Link>
                    </div>
                </section>
            </article>

            <article className="wrap-section">
                <section className="about-author-short">
                    <div className="author-photo">
                        {!isEmpty && !isLoaded && <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>}
                        <img src={data.authorImg} alt={data.name} onLoad={() => setIsLoaded(true)} style={{ display: isLoaded ? 'block' : 'none' }} />
                        {isEmpty && <img src="/images/sample-content-author.avif" alt="" />}
                    </div>
                    <div className="author-bio">
                        {isPending && <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>}
                        {hasData && (<>
                            <h2>{data.name}</h2>
                            <p>{data.presentation}</p>
                        </>)}
                        {isEmpty && <p>Противно на всеобщото вярване, Lorem Ipsum не е просто случаен текст. Неговите корени са в класическата Латинска литература от 45г.пр.Хр., което прави преди повече от 2000 години. Richard McClintock, професор по Латински от колежа Hampden-Sydney College във Вирджиния, изучавайки една от най-неясните латински думи "consectetur" в един от пасажите на Lorem Ipsum, и търсейки цитати на думата в класическата литература, открива точния източник.</p>}
                        <Link to="/about" className="btn" title="Научи повече">Научи повече</Link>
                    </div>
                </section>
                <section className="post-categories">
                    <h3>Свържете се с мен</h3>
                    <p>Оценяваме интереса ви. Това са възможните начини да се свържете с мен.</p>
                    <ul>
                        <li>
                            {hasData && <a href={data.facebook} title="Facebook"><img src="/images/facebook.svg" alt="Facebook" /></a>}
                            {isEmpty && <span ><img src="/images/facebook.svg" alt="Facebook" /></span>}
                        </li>
                        <li>
                            {hasData && <a href={data.instagram} title="Instagram"><img src="/images/instagram.svg" alt="Instagram" /></a>}
                            {isEmpty && <span><img src="/images/instagram.svg" alt="Instagram" /></span>}
                        </li>
                        <li>
                            {hasData && <a href={`email: ${data.email}`}><img src="/images/email.svg" alt="email" /></a>}
                            {isEmpty && <span><img src="/images/email.svg" alt="email" /></span>}
                        </li>
                    </ul>
                </section>
            </article>
            <LatestPosts />
            <LatestPractices />
        </>
    )
}