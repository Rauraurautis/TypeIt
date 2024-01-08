import { FC, useCallback, useEffect, useRef, useState } from 'react'



const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = useCallback((evt: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(evt.target as Node)) {
      setIsOpen(false)
    }
  }, [setIsOpen])


  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  useEffect(() => {


    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, []);

  return { isOpen, toggleDropdown, dropdownRef }


}

export default useDropdown