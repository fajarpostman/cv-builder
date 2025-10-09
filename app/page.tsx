/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 */

'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const navigate = useRouter();
  
  const handleButtonClick = () => {
    navigate.push('/cv');
  };

  return (
    <div>
      <h1>Welcome to CV Builder </h1>
      <p>This is the main page. Click the button to start building your CV.</p>
        <button onClick={handleButtonClick}>
          Build your CV.
        </button>
    </div>
  );
}
