import { Link } from "react-router";
import { LatestPosts } from "./latest-posts/LatestPosts.jsx";
import { LatestPractices } from "./latest-practices/LatestPractices.jsx";
import { endPoints } from "../../utils/endpoints.js";
import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch.js";

export function Home() {
    useEffect(() => {
        document.title = "Начална страница | Моят Блог";
    }, []);

    const { data, isPending } = useFetch(endPoints.settings, {});

    const hasData = !isPending && !!data && Object.keys(data).length > 0;

    const isEmpty = !isPending && (!data || Object.keys(data).length === 0);

    return (
        <>
            <article className="header-image">
                {isPending && <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>}
                {hasData && <img src={data.headerImg} alt={data.name} />}
                {isEmpty && <img src="https://firebasestorage.googleapis.com/v0/b/personal-blog-fadcb.firebasestorage.app/o/sample-content-header-image.png?alt=media&token=c875ef81-eaad-4a56-b63a-3a0bf52c30ae" alt="" />}
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