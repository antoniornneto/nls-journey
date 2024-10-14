import { Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const hour = data.get("hour")?.toString();
    const fullDate = data.get("date")?.toString(); //DATA EM FORMATO IS0 8601

    const convertDate = new Date(fullDate) //CONVERT PARA DATA NORMAL
    const year = convertDate.getFullYear().toString() // CAPTURANDO ANO
    const month = (convertDate.getMonth() + 1).toString() // CAPTURANDO MÊS
    const day = convertDate.getDate().toString() // CAPTURANDO DIA
    
    const newFormtIsoDate = new Date(`${year}-0${month}-${day}T${hour}:00`)
    const convertToIsoString = newFormtIsoDate.toISOString()

    await api.post(`/trips/${tripId}/activities`, {
      title: title,
      occurs_at: convertToIsoString,
    });

    window.document.location.reload();
  }

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button onClick={closeCreateActivityModal}>
              <X />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Digite a atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="flex items-center space-x-2">
            <h1>Selecione o dia da atividade: </h1>
            <select
              className="px-3 py-2 bg-zinc-950 border-zinc-800 rounded-lg"
              name="date"
            >
              {activities.map((category) => {
                return (
                  <option
                    key={category.date}
                    className="bg-zinc-950 border-zinc-800 text-zinc-200 flex-1"
                    value={category.date}
                  >
                    {format(category.date, "dd'/'MM")}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <h1>Selecione o horário: </h1>
            <input
              name="hour"
              className="px-3 py-1 bg-zinc-950 border-zinc-800 rounded-lg"
              type="time"
            />
          </div>

          <Button size="full" variant="primary">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
