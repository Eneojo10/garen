import React, {useEffect, useState} from 'react'

function Dark() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  const toggleTheme = () => {
    
    const newTheme = !theme;
    setTheme(newTheme);
    
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  useEffect(() => {
    if(theme===true){
      document.body.classList.add('dark');
    }else{
      document.body.classList.remove('dark');
    }
  })
  return (
    <div>
      <button className='dark_btn' onClick={toggleTheme}>
        {theme ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default Dark;