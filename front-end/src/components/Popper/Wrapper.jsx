import PropTypes from 'prop-types';
function Wrapper({ children, className }) {
  return (
    <div
      className={`w-full  rounded-lg shadow-xl bg-white  ${className}`}
      style={{
        maxHeight: 'min(100vh - 96px, 734px)',
      }}
    >
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
