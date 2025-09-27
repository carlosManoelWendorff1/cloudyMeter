export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Dashboard Content */}
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-center items-center bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 animate-gradient-x">
          <div className="text-center bg-neutral-50 p-10 rounded-2xl shadow-lg">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-700 mb-4">
              Nenhum medidor selecionado
            </h2>
            <p className="text-neutral mb-6">
              Por favor, selecione um medidor na sidebar à esquerda para
              visualizar os dados.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
