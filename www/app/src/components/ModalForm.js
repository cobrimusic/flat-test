import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ModalForm = props => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
    },[props.data])

    const handleClose = () =>{
        props.closeModal(false)
    }

    const onSubmit = (form) => {
        console.log('form', form)
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
                                            <option value="" selected disabled>Seleccionar</option>
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
                                            <option value="" selected disabled>Seleccionar</option>
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
                       

                        <footer className="modal-card-foot">
                            <button type="submit" className="button is-success">Crear</button>
                            <button className="button" onClick={handleClose}>Cancelar</button>
                        </footer>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default ModalForm
