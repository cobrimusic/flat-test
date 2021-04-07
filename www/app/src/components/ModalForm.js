import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const ModalForm = props => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [filesChanged, setFilesChanged] = useState()
    const [formData, setFormData] = useState({})
    const [canMake, setCanMake] = useState(false)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if(canMake) {
            postData(formData)
        }
    }, [formData, canMake])

    const handleClose = () =>{
        props.closeModal(false)
    }

    const onSubmit = (form) => {
        setFormData(form)
        if(form.base && form.head) {
            makeRequest(`${form.base}...${form.head}`)
        }
    }

    const makeRequest = (basehead) => {
        setLoader(true)

        fetch('http://0.0.0.0:8001/api/v1/compare/' + basehead, {
            headers: new Headers({
                "Authorization": "Token " + process.env.REACT_APP_TOKEN
            })
        })
        .then(results => {
            return results.json()
        }).then(data => {
            if(data.results.files.length > 0) {
                let files = data.results.files.map((file) => {
                    return(
                        <li>
                            { file.filename } | Additions: { file.additions } | Deletions: { file.deletions } | Changes: { file.changes } 
                        </li>
                    )
                })

                setFilesChanged(files)
                setCanMake(true)
            } else {
                let files = (<li>No hay archivos para hacer merge</li>)
                
                setFilesChanged(files)
                setCanMake(false)
            }
        })

        setLoader(false)
    }

    const postData = data => {
        fetch('http://0.0.0.0:8001/api/v1/pulls/create/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                "Authorization": "Token " + process.env.REACT_APP_TOKEN
            })
        })
        .then(results => {
            return results.json()
        }).then(result => {
            setTimeout(() => {
                handleClose()
            }, 1000);

            window.location.reload()
        })
    }

    return (
        <div className={"modal" + (props.open ? ' is-active' : '')}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Crear Pull Request</p>
                    <button className="delete" aria-label="close" onClick={handleClose}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label className="label">Título</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Title" defaultValue="" {...register("title", { required: true })} />
                            </div>
                            { <p className="help is-danger">{ errors.title && "Título es requerido" }</p> }
                        </div>

                        <div className="field">
                            <label className="label">Descripción</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="Descripción" defaultValue="" {...register("description", { required: true })}></textarea>
                            </div>
                            { <p className="help is-danger">{ errors.description && "Descripción es requerido" }</p> }
                        </div>

                        <div className="columns">
                            <div className="field column is-6">
                                <label className="label">Base</label>
                                <div className="control">
                                    <div className="select">
                                        <select {...register("base", { required: true })}>
                                            <option value="" disabled>Seleccionar</option>
                                            {
                                                props.data ? (
                                                    props.data.map((d, i) => <option value={d.name} key={d.name}>{d.name}</option>)
                                                ) : null
                                            }
                                        </select>
                                    </div>
                                    { <p className="help is-danger">{ errors.base && "Seleccione la base" }</p> }
                                </div>
                            </div>

                            <div className="field column is-6">
                                <label className="label">Head</label>
                                <div className="control">
                                    <div className="select">
                                        <select {...register("head", { required: true })}>
                                            <option value="" disabled>Seleccionar</option>
                                            {
                                                props.data ? (
                                                    props.data.map((d, i) => <option value={d.name} key={d.name}>{d.name}</option>)
                                                ) : null
                                            }
                                        </select>
                                    </div>
                                    { <p className="help is-danger">{ errors.head && "Seleccione el head" }</p> }
                                </div>
                            </div>
                        </div>

                        <input type="hidden" defaultValue="@cobrimusic" {...register("user")} />

                        <footer className="modal-card-foot">
                            <button type="submit" className="button is-success">Crear</button>
                            <button className="button" onClick={handleClose}>Cancelar</button>
                        </footer>
                    </form>

                    <section className="changes-view">
                        <ul style={{ listStyle: 'none', marginTop: '2px' }}>
                            { filesChanged }
                        </ul>
                    </section>

                    <section>
                        { loader && 'Cargando...' }
                    </section>
                </section>
            </div>
        </div>
    )
}

export default ModalForm
