import React, { Fragment } from 'react';

import PostCardList from '../../routes/normalRoute/PostCardList.js'

const Main = () => {
    return (
        <Fragment>
            <main>
                <div className="section_wrap">
                    <section>
                        <h2>글</h2>
                        <PostCardList className="card_list" />
                    </section>
                </div>
            </main>
        </Fragment>
    )
}

export default Main;