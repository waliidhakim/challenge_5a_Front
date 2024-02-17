"use client";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../../components/NavBar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHome,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./signup.css";
export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const initalFormData = {
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    address: "",
  };

  const [formData, setFormData] = useState(initalFormData);

  const handleChange = (event) => {

    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(JSON.stringify(formData));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.log("Erreur lors de l'inscription", response.body);
        throw new Error("Erreur lors de l'inscription");
      }
      
      setIsLoading(false);
      setFormData(initalFormData);
      toast.success("Opération réussie. Veuillez consulter votre boite mail", {
        autoClose: 1500,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("l'Opération a échoué. Veuillez réssayer", {
        autoClose: 1500,
      });
      console.error("Erreur d'inscription:", error);
    }
  };


return (
    <>
      <Navbar></Navbar>
      <ToastContainer />
      <div className="card">
        <h2 className="card-header">Créer un compte</h2>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstname"><FontAwesomeIcon icon={faUser} /> Prénom</label>
              <input id="firstname" name="firstname" type="text" onChange={handleChange} placeholder="Entrez votre prénom" />
            </div>
            <div className="form-group">
              <label htmlFor="lastname"><FontAwesomeIcon icon={faUser} /> Nom</label>
              <input id="lastname" name="lastname" type="text" onChange={handleChange} placeholder="Entrez votre nom" />
            </div>
            <div className="form-group">
              <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> Email</label>
              <input id="email" name="email" type="email" onChange={handleChange} placeholder="Entrez votre adresse email" />
            </div>
            <div className="form-group">
              <label htmlFor="address"><FontAwesomeIcon icon={faHome} /> Adresse</label>
              <input id="address" name="address" type="text" onChange={handleChange} placeholder="Entrez votre adresse" />
            </div>
            <div className="form-group">
              <label htmlFor="password"><FontAwesomeIcon icon={faLock} /> Mot de passe</label>
              <input id="password" name="password" type="password" onChange={handleChange} placeholder="Entrez votre mot de passe" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword"><FontAwesomeIcon icon={faLock} /> Confirmer le mot de passe</label>
              <input id="confirmPassword" name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirmez votre mot de passe" />
            </div>
            <button className="btn btn-primary">S'inscrire</button>
          </form>
          {isLoading && <div>Chargement...</div>}
        </div>
      </div>
    </>
);

}
