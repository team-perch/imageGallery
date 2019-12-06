import React from 'react';
import styled from 'styled-components';

function GalleryHeader(props) {
  const DialogHeader = styled.div`
    top: 0;
    z-index: 10021;
    position: fixed;
    width: 100vw;
    display: block;
    border-bottom: 1px solid #e2e2e2;
  `;
  const AddressHeader = styled.div`
    background: #fff;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 24px;
  `;
  const HeaderElement = styled.div`
    width: 70%;
    display: flex;
  `;
  const SvgIcon = styled.svg`
    height: 24px;
    position: relative;
    margin-right: 10px;
    width: 18px;
    fill: #585858;
    overflow: hidden;
    color: #333;
  `;
  const HeaderTitle = styled.span`
    display: inline-block;
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    font-family: Libre Franklin;
    font-size: 16px;
  `;
  const { changeStatus, info } = props;
  return (
    <DialogHeader>
      <AddressHeader>
        <HeaderElement onClick={changeStatus}>
          <SvgIcon>
            <svg viewBox="0 0 24 24">
              <path d="M 4.724 10.603 l 6.117 -6.115 a 0.25 0.25 0 0 0 0 -0.355 l -1.06 -1.06 a 0.25 0.25 0 0 0 -0.355 0 l -8.352 8.354 a 0.25 0.25 0 0 0 0 0.353 l 8.352 8.354 a 0.25 0.25 0 0 0 0.355 0 l 1.06 -1.06 a 0.25 0.25 0 0 0 0 -0.354 l -6.117 -6.117 H 23.06 a 0.25 0.25 0 0 0 0.25 -0.25 v -1.5 a 0.25 0.25 0 0 0 -0.25 -0.25 H 4.724 Z" fillRule="evenodd"/>
            </svg>
          </SvgIcon>
          <HeaderTitle>{info.property.address}</HeaderTitle>
        </HeaderElement>
      </AddressHeader>
    </DialogHeader>
  );
}

export default GalleryHeader;
