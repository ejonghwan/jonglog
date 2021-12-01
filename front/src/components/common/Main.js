import React, { Fragment } from 'react';

import PostCardList from '../../routes/normalRoute/PostCardList.js'

const Main = ({ children }) => {
    return (
        <Fragment>
            <main>
                <div className="section_wrap">
                    {children}
                    {/* <section>
                        <h2>글</h2>
                        <PostCardList className="card_list" />
                    </section> */}
                </div>
            </main>
        </Fragment>
    )
}

export default Main;