import ProjectHeader from "./projectHeader";

type Props = {
  params: {
    id: string;
  };
};

export default function projectPage({ params }: Props) {
  const id = Number(params.id);

  return (
    <div>
      <ProjectHeader id={id} />
    </div>
  );
}
