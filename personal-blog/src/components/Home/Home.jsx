import { Link } from "react-router";

export function Home() {
    return (
        <main>
            <article className="header-image">
                <img src="/images/header-image.jpg" alt="Гергана Стратева" />
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
                        <Link to="/blog" title="виж повече">виж повече</Link>
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
                <section className="about-author">
                    <div className="author-photo">
                        <img src="/images/author.jpg" alt="Гергана Стратева" />
                    </div>
                    <div className="author-bio">
                        <h2>Гергана Стратева</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet totam illum quas rerum,
                            voluptatem
                            ad
                            earum. Minima ducimus, impedit illum est provident modi maiores odit officiis autem pariatur
                            quo,
                            voluptates sint facere hic voluptatum. Minus placeat asperiores voluptatum ducimus beatae,
                            reiciendis eveniet facere facilis tenetur vel, aut officiis, nostrum repudiandae similique
                            provident.</p>
                        <Link to="/about" className="btn" title="Научи повече">Научи повече</Link>
                    </div>
                </section>
                <section className="post-categories">
                    <h3>Категории в блога</h3>
                    <ul>
                        <li><Link to="#" title="Арт">Арт</Link></li>
                        <li><Link to="#" title="Създаване">Създаване</Link></li>
                        <li><Link to="#" title="Знания">Знания</Link></li>
                        <li><Link to="#" title="Вдъхновение">Вдъхновение</Link></li>
                        <li><Link to="#" title="Здраве">Здраве</Link></li>
                        <li><Link to="#" title="Мъдрост">Мъдрост</Link></li>
                        <li><Link to="#" title="Почерк">Почерк</Link></li>
                    </ul>
                </section>
            </article>

            <article className="latest-posts">
                <h2>Последни публикации</h2>
                <div className="posts-container">
                    <section className="post">
                        <img src="/images/last-post-image.jpg" alt="Post 1" />
                        <h3>Заглавие на публикация 1</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nobis in praesentium
                            hic
                            aliquid possimus iste dolore maxime ducimus a? Praesentium eaque sed et vitae. Nulla
                            excepturi deleniti totam beatae voluptatibus! Commodi odit, fugiat architecto iste non
                            minima sequi cupiditate?</p>
                        <span className="post-date">01-03-2025</span>
                        <Link to="/blog" className="btn" title="Прочети повече">Прочети</Link>
                    </section>
                    <section className="post">
                        <img src="/images/last-post-image.jpg" alt="Post 2" />
                        <h3>Заглавие на публикация 2</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores alias voluptatem saepe
                            aliquam iste, labore at molestias odio excepturi corporis rem exercitationem pariatur
                            obcaecati consequatur aut reprehenderit rerum quo deleniti eos. Provident, dolore
                            excepturi
                            quisquam eos recusandae veritatis non ipsum.</p>
                        <span className="post-date">01-03-2025</span>
                        <Link to="/blog" className="btn" title="Прочети повече">Прочети</Link>
                    </section>
                    <section className="post">
                        <img src="/images/last-post-image.jpg" alt="Post 3" />
                        <h3>Заглавие на публикация 3</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt fuga beatae quaerat ea.
                            Alias
                            veniam quibusdam deleniti recusandae magnam optio, nisi soluta. Vel, voluptas
                            consectetur.
                            Pariatur, sunt rerum earum aut expedita incidunt nemo porro aspernatur fugiat dolorum
                            quam
                            quidem dolor!</p>
                        <span className="post-date">01-03-2025</span>
                        <Link to="/blog" className="btn" title="Прочети повече">Прочети</Link>
                    </section>
                </div>
            </article>

            <article className="latest-posts upcoming-practices">
                <h2>Предстоящи практики</h2>
                <div className="posts-container">
                    <section className="post">
                        <img src="/images/upcoming-practices-1.jpg" alt="Post 1" />
                         <Link to="/practices" className="btn" title="Научи повече">Научи повече</Link>
                        <h3>Естетика танци и ритмично дишане</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nobis in praesentium
                            hic
                            aliquid possimus iste dolore maxime ducimus a? Praesentium eaque sed et vitae. Nulla
                            excepturi deleniti totam beatae voluptatibus! Commodi odit, fugiat architecto iste non
                            minima sequi cupiditate?</p>
                    </section>
                    <section className="post">
                        <img src="/images/upcoming-practices-2.jpg" alt="Post 2" />
                        <Link to="/practices" className="btn" title="Научи повече">Научи повече</Link>
                        <h3>Естетика танци и ритмично дишане</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores alias voluptatem saepe
                            aliquam iste, labore at molestias odio excepturi corporis rem exercitationem pariatur
                            obcaecati consequatur aut reprehenderit rerum quo deleniti eos. Provident, dolore
                            excepturi
                            quisquam eos recusandae veritatis non ipsum.</p>
                    </section>
                    <section className="post">
                        <img src="/images/upcoming-practices-3.jpg" alt="Post 3" />
                        <Link to="/practices" className="btn" title="Научи повече">Научи повече</Link>
                        <h3>Естетика танци и ритмично дишане</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt fuga beatae quaerat ea.
                            Alias
                            veniam quibusdam deleniti recusandae magnam optio, nisi soluta. Vel, voluptas
                            consectetur.
                            Pariatur, sunt rerum earum aut expedita incidunt nemo porro aspernatur fugiat dolorum
                            quam
                            quidem dolor!</p>
                    </section>
                </div>
            </article>
        </main>
    )
}