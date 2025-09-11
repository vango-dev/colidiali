import ProgressItem from './ProgressItem';

//-----------------------------------------------------------------

export default function ProgressList({ files }) {
  return (
    <>
      {files.map((file, index) => (
        <ProgressItem file={file} key={index} isProfileUrl={false} />
      ))}
    </>
  );
}
