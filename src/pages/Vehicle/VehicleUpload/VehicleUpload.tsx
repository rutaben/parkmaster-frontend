import { routes } from "../../../routing/routes";
import VehicleUploadForm from "../../../components/Vehicle/VehicleUploadForm/VehicleUploadForm";
import ContentTemplate from "../../../common/ContentTemplate/ContentTemplate";

const VehicleUpload = () => {
  const topActions = [{ path: routes.vehicles.list, title: "Go back" }];

  return (
    <ContentTemplate title="Upload vehicle image" topActions={topActions}>
      <VehicleUploadForm />
    </ContentTemplate>
  );
};

export default VehicleUpload;
