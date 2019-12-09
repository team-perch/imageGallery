import React from 'react';
import styled from 'styled-components';

function GalleryFooter(props) {
  const DiaologFooter = styled.div`
    bottom: 0;
    z-index: 10021;
    position: fixed;
    width: 100vw;
    display: block;
  `;
  const Footer = styled.footer`
    position: relative!important;
    box-sizing: border-box;
    transition: opacity .2s ease-out 0s;
    opacity 1;
    box-shadow: 0 -3px 5px -2px #aaa;
    left: 0;
    display: table;
    border-spacing 10px 7px;
    height 60px;
    z-index: 10020;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding-bottom: env(safe-area-inset-bottom);
  `;
  const BBInfo = styled.div`
    display: inline-flex;
    vertical-align: top;
    box-sizing: border-box;
  `;
  const BedInfo = styled.div`
    padding: 12px 10px 10px 24px;
    boorder-spacing: 10px 7px;
    font-family: Libre Franklin;
    font-size: 16px;
  `;
  const BathInfo = styled.div`
    padding: 12px 11px 10px 10px;
    border-spacing: 10px 7px;
    font-family: Libre Franklin;
    font-size: 16px;
  `;
  const { info } = props;
  return (
    <DiaologFooter>
      <Footer>
        <BBInfo>
          <BedInfo>{info.property.beds} Beds</BedInfo>
          <BathInfo>{info.property.baths} Baths</BathInfo>
        </BBInfo>
      </Footer>
    </DiaologFooter>
  );
}

export default GalleryFooter;
