## CheckListEventStatus UseCase

- Obs: Regra relacionada ao caso de uso do App chega+ do Rodrigo Manguinho

> ## Dados

- Id do Grupo

> ## Fluxo primário

1. Obter os dados do último evento do grupo (data de término e duração do mercado de notas)
2. Retornar status "ativo" se o evento ainda não foi encerrado

> ## Fluxo alternativo: Evento está no limite do encerramento

1. Retornar status "ativo"

> ## Fluxo alternativo: Evento encerrado, mas está dentro do período do mercado de notas

1. Retornar status "em revisão"

> ## Fluxo alternativo: Evento e mercado das notas encerrados

1. Retorna status "encerrado"

> ## Fluxo alternativo Grupo não tem nenhum evento marcado

1. Retorna status "encerrado"
