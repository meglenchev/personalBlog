import { Link } from "react-router";
import { LatestPosts } from "./latest-posts/LatestPosts.jsx";
import { LatestPractices } from "./latest-practices/LatestPractices.jsx";
import { endPoints } from "../../utils/endpoints.js";
import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch.js";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Home() {
    useEffect(() => {
        document.title = "Начална страница | Моят Блог";
    }, []);

    const { data, isPending } = useFetch(endPoints.settings, {});

    const hasData = !isPending && !!data && Object.keys(data).length > 0;

    const isEmpty = !isPending && (!data || Object.keys(data).length === 0);

    var sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <>
            <article className="header-image">
                {/* {isPending && <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>}
                {hasData && <img src={data.headerImg} alt={data.name} />}
                {isEmpty && <img src="https://firebasestorage.googleapis.com/v0/b/personal-blog-fadcb.firebasestorage.app/o/sample-content-header-image.png?alt=media&token=c875ef81-eaad-4a56-b63a-3a0bf52c30ae" alt="" />} */}

                <Slider {...sliderSettings}>
                    <div className="slider-wrap">
                        <div className="slider-content">
                            <h3>Добре дошъл</h3>
                        </div>
                        <img src="https://firebasestorage.googleapis.com/v0/b/personal-blog-fadcb.firebasestorage.app/o/images%2Fheader-image.jpg?alt=media&token=33d7c531-734f-43f6-9c9d-23d9f7811919" alt="" />
                    </div>
                    <div className="slider-wrap">
                        <div className="slider-content">
                            <h3>Защо холистични практики</h3>
                        </div>
                        <img src="https://firebasestorage.googleapis.com/v0/b/personal-blog-fadcb.firebasestorage.app/o/images%2Fslider-2.jpg?alt=media&token=f32a8a8c-eaae-4f65-ae98-34920a36c6af" alt="" />
                    </div>
                </Slider>
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
                        {isPending && <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>}
                        {hasData && <img src={data.authorImg} alt={data.name} />}
                        {isEmpty && <img src="https://firebasestorage.googleapis.com/v0/b/personal-blog-fadcb.firebasestorage.app/o/sample-content-author.png?alt=media&token=c6033a51-c955-4387-9251-2178f6044ae0" alt="" />}
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