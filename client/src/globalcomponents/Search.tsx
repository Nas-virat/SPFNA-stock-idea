import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Select, {components} from 'react-select';
import Swal from 'sweetalert2';

const Search = ({placeholder,options,link}:any) => {

  const [selectedOption, setSelectedOption] = useState(options);
  const navigate = useNavigate();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(selectedOption){
      navigate(link+selectedOption.value);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a keyword!',
      })
    }
  }

  return (
    <div className ="flex flex-row className='h-full w-full rounded-3xl pl-4'">
      <div className='w-full self-center'>
        <Select 
          placeholder={placeholder} 
          defaultValue={selectedOption} 
          options={options} 
          onChange={setSelectedOption}
          isClearable={true}
        />
      </div>
      <button 
        className='bg-[#856dab] hover:bg-[#4a366b] text-white font-bold w-1/5 rounded-3xl' 
        type="submit" 
        onClick = {handleSubmit}
      >
        Go
      </button>
    </div>
  )
}


export default Search