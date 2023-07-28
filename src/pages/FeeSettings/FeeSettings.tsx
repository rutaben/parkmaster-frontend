import FeeSettingForm from "../../components/Settings/FeeSettingForm/FeeSettingForm";
import ContentTemplate from "../../common/ContentTemplate/ContentTemplate";

const FeeSettings = () => {
  return (
    <ContentTemplate title="Change Fee Rate">
      <FeeSettingForm />
    </ContentTemplate>
  );
};

export default FeeSettings;
