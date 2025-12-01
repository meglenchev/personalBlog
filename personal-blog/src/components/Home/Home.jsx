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
                        <a href="#" title="виж повече">виж повече</a>
                    </div>
                </section>
                <section>
                    <img src="/images/novo.svg" alt="Ново в блога" />
                    <div>
                        <h2>Ново в блога</h2>
                        <a href="#" title="виж повече">виж повече</a>
                    </div>
                </section>
                <section>
                    <img src="/images/author.svg" alt="За авторката" />
                    <div>
                        <h2>За авторката</h2>
                        <a href="#" title="виж повече">виж повече</a>
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
                        <a href="#" className="btn" title="Button style">Научи повече</a>
                    </div>
                </section>
                <section className="post-categories">
                    <h3>Категории в блога</h3>
                    <ul>
                        <li><a href="#" title="Арт">Арт</a></li>
                        <li><a href="#" title="Създаване">Създаване</a></li>
                        <li><a href="#" title="Знания">Знания</a></li>
                        <li><a href="#" title="Вдъхновение">Вдъхновение</a></li>
                        <li><a href="#" title="Здраве">Здраве</a></li>
                        <li><a href="#" title="Мъдрост">Мъдрост</a></li>
                        <li><a href="#" title="Почерк">Почерк</a></li>
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
                        <a href="#" className="btn" title="Прочети повече">Прочети</a>
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
                        <a href="#" className="btn" title="Прочети повече">Прочети</a>
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
                        <a href="#" className="btn" title="Прочети повече">Прочети</a>
                    </section>
                </div>
            </article>

            <article className="latest-posts upcoming-practices">
                <h2>Предстоящи практики</h2>
                <div className="posts-container">
                    <section className="post">
                        <img src="/images/upcoming-practices-1.jpg" alt="Post 1" />
                        <a href="#" className="btn" title="Научи повече">Научи повече</a>
                        <h3>Естетика танци и ритмично дишане</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nobis in praesentium
                            hic
                            aliquid possimus iste dolore maxime ducimus a? Praesentium eaque sed et vitae. Nulla
                            excepturi deleniti totam beatae voluptatibus! Commodi odit, fugiat architecto iste non
                            minima sequi cupiditate?</p>
                    </section>
                    <section className="post">
                        <img src="/images/upcoming-practices-2.jpg" alt="Post 2" />
                        <a href="#" className="btn" title="Научи повече">Научи повече</a>
                        <h3>Естетика танци и ритмично дишане</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores alias voluptatem saepe
                            aliquam iste, labore at molestias odio excepturi corporis rem exercitationem pariatur
                            obcaecati consequatur aut reprehenderit rerum quo deleniti eos. Provident, dolore
                            excepturi
                            quisquam eos recusandae veritatis non ipsum.</p>
                    </section>
                    <section className="post">
                        <img src="/images/upcoming-practices-3.jpg" alt="Post 3" />
                        <a href="#" className="btn" title="Научи повече">Научи повече</a>
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