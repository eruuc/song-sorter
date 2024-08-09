import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PairAdjuster = ({ key1, key2, value1, value2, updateMap }) => {
  const [adjustment1, setAdjustment1] = useState(0);
  const [adjustment2, setAdjustment2] = useState(0);

  const handleAdjust = () => {
    updateMap(key1, key2, adjustment1, adjustment2);
    setAdjustment1(0);
    setAdjustment2(0);
  };

  return (
    <div className="pair-adjuster">
      <div className="pair">
        <div className="item">
          <h3>{key1}: {value1}</h3>
          <input
            type="number"
            value={adjustment1}
            onChange={(e) => setAdjustment1(Number(e.target.value))}
          />
        </div>
        <div className="item">
          <h3>{key2}: {value2}</h3>
          <input
            type="number"
            value={adjustment2}
            onChange={(e) => setAdjustment2(Number(e.target.value))}
          />
        </div>
      </div>
      <button onClick={handleAdjust}>Adjust Values</button>
    </div>
  );
};

PairAdjuster.propTypes = {
  key1: PropTypes.string.isRequired,
  key2: PropTypes.string.isRequired,
  value1: PropTypes.number.isRequired,
  value2: PropTypes.number.isRequired,
  updateMap: PropTypes.func.isRequired,
};

export default PairAdjuster;
