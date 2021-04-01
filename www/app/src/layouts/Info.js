import React, { useState } from 'react'
import Tag from '../components/Tag'
import DetailInfo from './DetailInfo'

function Info(props){
    const [detailInfo, setDetailInfo] = useState()

    const handle_info = (ref) => {
        const url = 'http://0.0.0.0:8001/api/v1/commit/' + ref
        fetch(url, {
            headers: new Headers({
                "Authorization": "Token " + process.env.REACT_APP_TOKEN
            })
        })
        .then(results => {
            return results.json()
        })
        .then(data => {
            let info = <DetailInfo name={ data.results.sha.substr(0, 7) } data={ data.results } />
            setDetailInfo(info)
        })
    }
    return (
        <div className="column is-12 info-padding" style={{ padding:'0'}}>
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-content" style={{ alignSelf:'center' }}>
                            <p className="title is-4">{ props.name }</p>
                            <div className="columns is-multiline">
                                <div className="column is-8">
                                    <span>
                                        <b>Commits: </b>
                                        <div className="columns is-multiline is-mobile">
                                            { props.data.commits.map((data) => (
                                                <div key={ data.sha.substr(0, 7) } className="column is-4-desktop is-6-mobile">
                                                    <div className="tags">
                                                        <Tag move={ data.sha.substr(0, 7) }/>
                                                        <p>Autor: { data.commit.author.name }</p>
                                                        <p>Mensaje: { data.commit.message }</p>
                                                        <p>Fecha: { data.commit.author.date }</p>
                                                        <button class="button is-info" onClick={(e) => handle_info(data.sha)}>Info</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </span>
                                </div>
                                
                                <div className="column is-4">
                                    { detailInfo }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Info