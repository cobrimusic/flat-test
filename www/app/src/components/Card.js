import React from 'react'

const Card = props => (
    <div className="column is-4">
        <div className="card">
            <div className="card-content">
                {
                    props.tag && (
                        <span class="tag is-info">{ props.data.status }</span>
                    )
                }
                <div className="media">
                    <div className="">
                        <p className="title is-4">{ props.name }</p>
                    </div>
                </div>
                
                { props.param ? (
                    <div className="content">
                        Ver más acerca de <a href={'branch/' + props.param}>@{ props.name }</a>.
                        <br />
                    </div>
                ) : (
                    <div className="content">
                        {props.data.base_name + ' < ' + props.data.head_name}
                        <br />
                    </div>
                )}

                { props.button && props.button != 'merged' ? (
                    props.data.status == 'open' && (
                        <div>
                            <button class="button is-success" onClick={() => props.updateStatus(props.data, 'merged') }>Merge</button>
                            <button class="button is-danger" onClick={() => props.updateStatus(props.data, 'closed') }>Close</button>
                        </div>
                    )
                ) : null}
            </div>
        </div>
    </div>
)

export default Card;

