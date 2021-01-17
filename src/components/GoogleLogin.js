const GoogleLogin = ({ onLogin }) => {
  return (
    <div className='row d-flex justify-content-center'>
      <div className='col-md-4'>
        <div className='card card-body'>
          <h3 className='mb-4 text-center'>Contact Manager</h3>
          <button className='btn btn-info btn-lg' onClick={onLogin}>
            Login With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleLogin;
