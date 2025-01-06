import ActionDropdown from "@/components/ActionDropdown";
import FormattedDateTime from "@/components/FormattedDateTime";
import Thumbnail from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles } from "@/lib/actions/file.actions";
import { getUsageSummary } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

const Dashboard = async () => {
  // Parallel requests
  const [files] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    // getTotalSpaceUsed(),
  ]);

  const dataToDisplay = getUsageSummary({
    document: {
      size: 20,
      lastUpdate: "10:15 am, 10 Okt",
    },
    image: {
      size: 20,
      lastUpdate: "10:15 am, 10 Okt",
    },
    video: {
      size: 20,
      lastUpdate: "10:15 am, 10 Okt",
    },
    audio: {
      size: 20,
      lastUpdate: "10:15 am, 10 Okt",
    },
    other: {
      size: 20,
      lastUpdate: "10:15 am, 10 Okt",
    },
  });

  console.log(files);

  return (
    <div className="dashboard-container">
      <section>
        <div className="chart mt-7 transition-all hover:scale-105">
          <div className="chart-container flex flex-col justify-center items-center">
            <span>Chart</span>
            <span className="chart-total-percentage mb-2">65%</span>
            <span className="chart-title">Space used</span>
          </div>
          <div className="chart-container flex flex-col justify-center items-start">
            <span className="chart-title">Available Storage</span>
            <span className="chart-description">82GB / 128GB</span>
          </div>
        </div>
        <div className="dashboard-summary-list">
          {dataToDisplay.map((data, index) => {
            return (
              <div key={data.title} className="dashboard-summary-card">
                <div className="flex justify-end">
                  <Image
                    className="summary-type-icon"
                    src={data.icon}
                    alt={data.title}
                    width={50}
                    height={10}
                  />
                  <span className="summary-type-size">20 GB</span>
                </div>

                <div className="flex flex-col gap-4 items-center mt-10 mb-5 ">
                  <div className="h5">{data.title}</div>
                  <Separator />
                  <div className="recent-file-date">Last update</div>
                  <div className="recent-file-date">10:15 am, 10 Okt</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="dashboard-summary-card">
        <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.documents.map((file: Models.Document) => (
              <Link href={file.url}
              target="_blank"
              className="flex items-center gap-3"
              key={file.$id}>
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />
                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}

        {/* <div className="flex flex-row">
          <Thumbnail type="" extension="" />
          <div className="dashboard-recent-files">
            <span className="recent-file-name">document-neki.docx</span>
            <span className="recent-file-date">4:57am, 10 Nov</span>
          </div> */}
        {/* <ActionDropdown /> */}
        {/* </div> */}
      </section>
    </div>
  );
};

export default Dashboard;
