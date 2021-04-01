import React from 'react'
// import moment from 'moment'

function DetailInfo(props) {
	return (
		<div className="column is-12 info-padding" style={{ padding: '0' }}>
			<article class="panel is-primary">
				<p class="panel-heading">
					{ props.name }
                </p>
				<p class="panel-heading">
					{ props.data.commit.author.name } | { props.data.commit.author.email } 
				</p>
				{ props.data.files.map((file) => (
					<p class="panel-block is-active">
						{ file.filename } | { file.changes } cambio(s) | { file.status }
					</p>
				))}
            </article>
        </div>
    )
}


export default DetailInfo