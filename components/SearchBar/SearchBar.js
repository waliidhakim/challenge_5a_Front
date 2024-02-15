// SearchBar.js
import React, { useState, useEffect } from 'react';
import UserLocationMap from '../../components/UserLocationMap/UserLocationMap';
import fetchData from '@/app/lib/fetchData';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Autre');
  const [categories, setCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('Tous');
  const [error, setError] = useState([]);


  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue, selectedCategory, selectedPriceRange); 
  };

  const fetchCategories = async () => {
    try {
        const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        console.log("Categories : ",data['hydra:member']);
        setCategories(data['hydra:member']);
    } catch (error) {
        console.log('Error fetching catagories:', error);
        if (error = '403')
            setError("Vous n'avez pas accès à cette section");
        else {
            setError("Une erreur est survenue. Veuillez réessayer");
        }
        
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Rechercher..."
        />
        

        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Choisir une catégorie</option>
          {
            categories.map((category) =>{
              return <option key={category['@id']} value={category.name}>{category.name}</option>
            })
          }
          <option value="Autre" >Autre</option>
        </select>

        <select value={selectedPriceRange} onChange={handlePriceRangeChange}>
          <option value="">Filtrer par prix</option>
          <option value="Tous" >Tous les résultats</option>
          <option value="0-50">Moins de 50 euros</option>
          <option value="0-100">Entre 50 et 100 euros</option>
          <option value="100-200">Entre 100 et 200 euros</option>
        </select>



        <button type="submit">Rechercher</button>
      </form>
      <UserLocationMap />
    </div>
  );
};

export default SearchBar;
