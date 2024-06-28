import { useAuthenticator } from '@aws-amplify/ui-react';

function Header(props) {
  const { signOut } = useAuthenticator((context) => [context.signOut]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10'>
          <h1>Ground Control System</h1>
        </div>
        <div className='col-2'>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
