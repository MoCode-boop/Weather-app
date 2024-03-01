

interface Props {
  children: React.ReactNode;
}

const Infobox = ({ children }: Props) => {
  return <div className="infobox pb-60 pt-5 m-3 rounded-lg">{children}</div>;
};

export default Infobox;
