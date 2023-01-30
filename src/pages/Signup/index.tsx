import React from "react";
import { BannerLogin } from "../../components/BannerLogin";
import { ContainerForm } from "../../components/ContainerForm";
import { ContentLogin } from "../../components/ContentLogin";
import Form from "../../components/Form";

const Signup = () => {
  return (
    <React.Fragment>
      <ContentLogin>
        <BannerLogin />
        <ContainerForm>
          <Form mode='signup' />
        </ContainerForm>
      </ContentLogin>
    </React.Fragment>
  );
};

export default Signup;
